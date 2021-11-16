import { HttpException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddArbitrageFilesToCaseData } from 'src/modules/member/dtos/case/add-arbitrage-files-to-case.dto';
import { AddDefendantFilesToCaseData } from 'src/modules/guest/dto/case/add-defendant-files-to-case.dto';
import { CreateCaseData } from 'src/modules/guest/dto/case/create-case.dto';
import { CaseStatusType } from 'src/modules/guest/enums/case-status.enum';
import { CaseDocument } from 'src/modules/guest/schemas/cases.schema';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { FindCasesData, Paging } from '../dtos/case/find-cases.dto';
import { SearchCaseData } from '../dtos/case/search-case.dto';
import { ChangeCaseStatusData } from '../dtos/case/change-case-status.dto';
import { EditCaseData } from '../dtos/case/edit-case.dto';
import { AddArbitrageMeetingData } from '../dtos/case/add-arbitrage-meeting.dto';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel('Case')
    private readonly caseModel: Model<CaseDocument>,
    private readonly _sharedService: SharedService,
  ) {}
  async findCaseByCaseId(caseId: string) {
    const result = await this.caseModel.findOne({ caseId });
    const user = await this._sharedService.getUserByCaseId(caseId);
    return { result, user };
  }
  async findCaseByCaseUser(user: any) {
    const result = await this.caseModel.findOne({ caseId: user.caseId });
    return result;
  }
  async findDraftCases(
    findCasesData: FindCasesData,
    paging: Paging,
    user: any,
  ) {
    if (!Object.values(CaseStatusType).includes(findCasesData.status)) {
      throw new HttpException('Invalid Status', 400);
    } else {
      const query = {
        status: findCasesData.status,
        'record.isDeleted': false,
      };
      // let total = await this.caseModel.countDocuments({
      //   status: findCasesData.status,
      //   'record.isDeleted': false,
      // });
      const skip =
        paging && paging.page && paging.size ? paging.page * paging.size : 0;
      const limit = paging && paging.size ? paging.size : 0;
      if (findCasesData.term) {
        query['$or'] = [
          { title: new RegExp(`${findCasesData.term}`) },
          { caseId: new RegExp(`${findCasesData.term}`) },
        ];
      }
      if (findCasesData.status === 'ACTIVE' && user.roles.includes('ARBITR')) {
        query['arbitr._id'] = user._id;
      }
      const total = await this.caseModel.countDocuments(query);
      const searchResult = await this.caseModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({
          'record.createdAt': -1,
        });
      const number = paging?.size && total ? total / paging.size : null;
      const result = {
        data: searchResult,
        page: {
          total,
          size: paging && paging.size ? paging.size : null,
          number,
        },
      };
      return result;
    }
  }
  async rejectCase(_id: string) {
    // const selectedCase = await this.caseModel.findOne({ _id });
    const result = await this.caseModel.findOneAndUpdate(
      { _id },
      { $set: { status: 'REJECTED' } },
      { new: true, useFindAndModify: false },
    );
    return result;
  }
  async bindUsersToCase(
    caseId: string,
    userIds: { position: string; _id: string }[],
  ) {
    const arbiters = await this.findArbiters(userIds);
    const neededCase = await await this.caseModel.findOne({
      _id: caseId,
    });
    const query: any = {
      arbitr: arbiters,
    };
    if (neededCase.status === 'DRAFT') {
      query.status = 'ACTIVE';
    }
    if (arbiters?.length) {
      const result = await this.caseModel.findOneAndUpdate(
        { _id: caseId },
        {
          $set: query,
        },
        { new: true, useFindAndModify: false },
      );
      return result;
    } else {
      throw new HttpException('Arbitr Not Found', 400);
    }
  }
  async getCasesForArbitr(_id: string) {
    const result =  await this.caseModel.find({
      'arbitr._id': _id,
      'record.isDeleted': false,
    });
    return result;
  }
  async search(searchDto: SearchCaseData) {
    const result = await this.caseModel.find({});
    return result;
  }
  async addArbitrageFilesToCase(data: AddArbitrageFilesToCaseData) {
    const result = await this.caseModel.findOneAndUpdate(
      { _id: data._id },
      { $set: { arbitrageFiles: data.arbitrageFiles } },
      { new: true, useFindAndModify: false },
    );
    return result;
  }
  async changeCaseStatus(data: ChangeCaseStatusData, user: any) {
    const currentCase = await this.caseModel.findOne({
      _id: data._id,
      'arbitr._id': user._id,
    });
    if (currentCase) {
      if (data.status === 'FINISHED' && currentCase.status === 'ACTIVE') {
        if (currentCase.arbitrageFiles?.length) {
          const result = await this.caseModel.findOneAndUpdate(
            { _id: data._id },
            { $set: { status: data.status } },
            { new: true, useFindAndModify: false },
          );
          return result;
        } else {
          throw new HttpException(
            'This case do not include arbitrage Documents',
            400,
          );
        }
      } else {
        throw new HttpException('Case Status Can Not Change To This ', 400);
      }
    } else {
      throw new HttpException(
        'Case Do Not Exist Or is Not Bound To This Arbiter ',
        400,
      );
    }
  }
  async editCase(data: EditCaseData) {
    const result = await this.caseModel.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      { new: true, useFindAndModify: false },
    );
    return result;
  }
  async countArbitrCases(arbitrId: string) {
    const result = await this.caseModel.countDocuments({
      'arbitr._id': arbitrId,
    });
    return result;
  }
  async findArbiters(arbiters: { position: string; _id: string }[]) {
    return Promise.all(
      arbiters.map(async arbiter => {
        const foundArbiter = await this._sharedService.getUserById(arbiter._id);
        const result = {
          roles: foundArbiter.roles,
          _id: foundArbiter._id,
          firstName: foundArbiter.firstName,
          lastName: foundArbiter.lastName,
          pid: foundArbiter.pid,
          type: foundArbiter.type,
          position: arbiter.position === 'mainArbitr' ? 'main' : 'common',
        };
        return result;
      }),
    );
  }
  async addArbitrageMeeting(arbitrageMeetingData: AddArbitrageMeetingData) {
    const currentCase = await this.caseModel.findOne({
      _id: arbitrageMeetingData._id,
    });
    if (!currentCase) {
      throw new HttpException('Case Not Found', 400);
    }
    const result = await this.caseModel.findOneAndUpdate(
      { _id: arbitrageMeetingData._id },
      { $set: { arbitrageMeetings: arbitrageMeetingData.arbitrageMeetings } },
      { new: true, useFindAndModify: false },
    );
    return result;
  }
}
