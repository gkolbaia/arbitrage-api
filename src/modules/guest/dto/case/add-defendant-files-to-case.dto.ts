import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from 'src/modules/shared/classes/arbitrage-request.class';

export class AddDefendantFilesToCaseData {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  defendantFiles: any[];
}

export class AddDefendantFilesToCaseDTO extends ArbitrageRequest {
  @Type(() => AddDefendantFilesToCaseData) data: AddDefendantFilesToCaseData;
}
