import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from 'src/modules/shared/classes/arbitrage-request.class';
import { CasePerson } from 'src/modules/shared/classes/case-person.class';

export class EditCaseData {
  _id: string;
  title: string;
  description: string;
  reporter: CasePerson;
  defendant: CasePerson;
}

export class EditCaseDTO extends ArbitrageRequest {
  @Type(() => EditCaseData) data: EditCaseData;
}
