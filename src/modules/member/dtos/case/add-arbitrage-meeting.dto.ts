import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageMeeting } from '../../../shared/classes/arbitrage-meeting.class';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';

export class AddArbitrageMeetingData {
  _id: string;
  @IsNotEmpty()
  arbitrageMeetings: ArbitrageMeeting[];
}

export class AddArbitrageMeetingDTO extends ArbitrageRequest {
  @Type(() => AddArbitrageMeetingData) data: AddArbitrageMeetingData;
}
