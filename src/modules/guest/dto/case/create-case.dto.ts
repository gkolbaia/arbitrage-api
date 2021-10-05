import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from 'src/modules/shared/classes/arbitrage-request.class';
import { CasePerson } from 'src/modules/shared/classes/case-person.class';

export class CreateCaseData {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: string;
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
