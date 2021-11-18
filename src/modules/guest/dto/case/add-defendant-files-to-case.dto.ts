import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';
export class AddDefendantFilesToCaseData {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  defendantFiles: any[];
  @IsString()
  description: string;
}

export class AddDefendantFilesToCaseDTO extends ArbitrageRequest {
  @Type(() => AddDefendantFilesToCaseData) data: AddDefendantFilesToCaseData;
}
