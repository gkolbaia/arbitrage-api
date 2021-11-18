import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';
export class AddReportFilesToCaseData {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  reportFiles: any[];
}

export class AddReportFilesToCaseDTO extends ArbitrageRequest {
  @Type(() => AddReportFilesToCaseData) data: AddReportFilesToCaseData;
}
