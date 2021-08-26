import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaseDocument } from '../schemas/cases.schema';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel('Case')
    private readonly caseModel: Model<CaseDocument>,
  ) {}
  async createCase(caseData: any) {
    const newCase = new this.caseModel(caseData).save();

    return await newCase;
  }
}
