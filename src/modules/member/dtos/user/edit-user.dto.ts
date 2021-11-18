import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';

export class EditUserData {
  _id: string;
}

export class EditUserDTO extends ArbitrageRequest {
  @Type(() => EditUserData) data: EditUserData;
}
