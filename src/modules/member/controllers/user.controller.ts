import { Body, Controller, Post } from '@nestjs/common';
import { ArbitrageResponse } from 'src/modules/shared/classes/arbitrage-response.class';
import { Result } from 'src/modules/shared/classes/arbitrage-result.class';
import { CreateUserDTO } from '../dtos/user/create-user.dto';
import { UserService } from '../services/user.service';
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Post('')
  async userRegistration(@Body() body: CreateUserDTO) {
    const result = await this._userService.registrateUser(body.data);
    return new ArbitrageResponse(new Result(result));
  }
}
