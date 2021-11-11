import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from 'src/modules/shared/classes/arbitrage-request.class';

export class AddArbitrageFilesToCaseData {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  arbitrageFiles: any[];
}

export class AddArbitrageFilesToCaseDTO extends ArbitrageRequest {
  @Type(() => AddArbitrageFilesToCaseData) data: AddArbitrageFilesToCaseData;
}
