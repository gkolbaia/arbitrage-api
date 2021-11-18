import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';

export class ChangePasswordData {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class ChangePasswordDTO extends ArbitrageRequest {
  @Type(() => ChangePasswordData) data: ChangePasswordData;
}
