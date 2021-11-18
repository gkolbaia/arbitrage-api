import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';
import { CaseDescription } from '../../../shared/classes/case-description.class';
import { CasePerson } from '../../../shared/classes/case-person.class';

export class CreateCaseData {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: CaseDescription;
  @IsString()
  caseId: string;
  @IsNotEmpty()
  reporter: CasePerson;
  @IsNotEmpty()
  defendant: CasePerson;
  reportFiles: any[];
}

export class CreateCaseDTO extends ArbitrageRequest {
  @Type(() => CreateCaseData) data: CreateCaseData;
}
