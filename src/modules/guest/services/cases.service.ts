import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedService } from 'src/modules/shared/services/shared.service';
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
    const caseNumber = await this.caseModel.countDocuments({});
    const caseNumberString = String(caseNumber);
    let result = String('00000000000').slice(0, 10 - caseNumberString.length);
    return (result += caseNumberString);
  }
}
