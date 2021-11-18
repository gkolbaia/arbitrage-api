import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ArbitrageRequest } from '../../../shared/classes/arbitrage-request.class';

export class CreateUserData {
  username: string;
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  pid: string;
  type: string;
  roles: [string];
  userId: string;
  password: string;
}

export class CreateUserDTO extends ArbitrageRequest {
  @Type(() => CreateUserData) data: CreateUserData;
}
