import { HttpException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddDefendantFilesToCaseData } from 'src/modules/guest/dto/case/add-defendant-files-to-case.dto';
import { CreateCaseData } from 'src/modules/guest/dto/case/create-case.dto';
import { CaseStatusType } from 'src/modules/guest/enums/case-status.enum';
import { CaseDocument } from 'src/modules/guest/schemas/cases.schema';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { FindCasesData, Paging } from '../dtos/case/find-cases.dto';
import { SearchCaseData } from '../dtos/case/search-case.dto';

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
  async findDraftCases(findCasesData: FindCasesData, paging: Paging) {
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
    const selectedCase = await this.caseModel.findOne({ _id });
    if (!selectedCase) {
      throw new HttpException('Case Not Found', 400);
    } else if (selectedCase.status === 'DRAFT') {
      const result = await this.caseModel.findOneAndUpdate(
        { _id },
        { $set: { status: 'REJECTED' } },
        { new: true, useFindAndModify: false },
      );
      return result;
    } else {
      throw new HttpException('Case Is Not Draft', 400);
    }
  }
  async bindUserToCase(data: { caseId: string; userId: string }) {
    const arbitr = await this._sharedService.getUserById(data.userId);
    if (arbitr) {
      const result = await this.caseModel.findOneAndUpdate(
        { _id: data.caseId },
        {
          $set: {
            arbitr,
            status: 'ACTIVE',
          },
        },
        { new: true, useFindAndModify: false },
      );
      return result;
    } else {
      throw new HttpException('Arbitr Not Found', 400);
    }
  }
  async search(searchDto: SearchCaseData) {
    const result = await this.caseModel.find({});
    return result;
  }
}
