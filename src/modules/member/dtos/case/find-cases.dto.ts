import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';
export class FindCasesData {
  status: string;
  term: string;
}
export class Paging {
  page: number;
  size: number;
}

export class FindCasesDTO extends ArbitrageRequest {
  @Type(() => FindCasesData) data: FindCasesData;
  @Type(() => Paging) paging: Paging;
}
