import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CaseStatusType } from '../../../guest/enums/case-status.enum';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';

export class SearchCaseData {
  @IsNotEmpty()
  @IsString()
  term: string;
  @IsNotEmpty()
  @IsEnum(CaseStatusType)
  status: string;
}

export class SearchCaseDTO extends ArbitrageRequest {
  @Type(() => SearchCaseData) data: SearchCaseData;
}
