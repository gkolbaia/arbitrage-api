import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CaseStatusType } from 'src/modules/guest/enums/case-status.enum';
import { ArbitrageRequest } from 'src/modules/shared/classes/arbitrage-request.class';

export class ChangeCaseStatusData {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  @IsEnum(CaseStatusType)
  status: string;
}

export class ChangeCaseStatusDTO extends ArbitrageRequest {
  @Type(() => ChangeCaseStatusData) data: ChangeCaseStatusData;
}
