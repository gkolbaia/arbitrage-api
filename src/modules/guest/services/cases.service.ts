import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/modules/shared/services/shared.service';
import { AddDefendantFilesToCaseData } from '../dto/case/add-defendant-files-to-case.dto';
import { AddReportFilesToCaseData } from '../dto/case/add-report-files-to-case.dto';
import { CreateCaseData } from '../dto/case/create-case.dto';
import { CaseDocument } from '../schemas/cases.schema';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel('Case')
    private readonly caseModel: Model<CaseDocument>,
    private readonly _sharedService: SharedService,
  ) {
    this.generateCaseId();
  }
  async createCase(caseData: CreateCaseData) {
    caseData.caseId = await this.generateCaseId();
    const newCase = await new this.caseModel(caseData).save();
    const user = await this._sharedService.createCaseUser(newCase.caseId);
    const result = {
      record: newCase?.record,
      status: newCase?.status,
      caseId: newCase?.caseId,
      username: user?.result.username,
      password: user?.password,
      defendant: newCase?.defendant,
      reporter: newCase?.reporter,
    };
    return result;
  }
  async generateCaseId(): Promise<string> {
    const caseId = await this.caseModel.countDocuments({});
    const caseIdString = String(caseId);
    let result = String('00000000000').slice(0, 10 - caseIdString.length);
    return (result += caseIdString);
  }
  async findCaseByCaseId(caseId: string) {
    const result = await this.caseModel.findOne({ caseId });
    const user = await this._sharedService.getUserByCaseId(caseId);
    return { result, user };
  }
  async addDefendantFilesTocase(data: AddDefendantFilesToCaseData) {
    const result = await this.caseModel.findOneAndUpdate(
      { _id: data._id },
      { $set: { defendantFiles: data.defendantFiles } },
      { new: true, useFindAndModify: false },
    );
    return result;
  }
  async addReportFilesTocase(data: AddReportFilesToCaseData) {
    const result = await this.caseModel.findOneAndUpdate(
      { _id: data._id },
      { $set: { reportFiles: data.reportFiles } },
      { new: true, useFindAndModify: false },
    );
    return result;
  }
  async findCaseByCaseUser(user: any) {
    const result = await this.caseModel.findOne({ caseId: user.caseId });
    return result;
  }
  async findDraftCases() {
    const result = await this.caseModel.find({
      status: 'DRAFT',
      'record.isDeleted': false,
    });
    return result;
  }
  async rejectCase(_id: string) {
    const result = await this.caseModel.findOneAndUpdate(
      { _id },
      { $set: { status: 'REJECTED' } },
      { new: true, useFindAndModify: false },
    );
    return result;
  }
}
