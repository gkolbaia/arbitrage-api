import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';
import { CaseDescription } from '../../../shared/classes/case-description.class';
import { CasePerson } from '../../../shared/classes/case-person.class';

export class EditCaseData {
  _id: string;
  title: string;
  description: CaseDescription;
  reporter: CasePerson;
  defendant: CasePerson;
}

export class EditCaseDTO extends ArbitrageRequest {
  @Type(() => EditCaseData) data: EditCaseData;
}
