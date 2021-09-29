import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ArbitrageResponse } from 'src/modules/shared/classes/arbitrage-response.class';
import { Result } from 'src/modules/shared/classes/arbitrage-result.class';
import { CreateUserDTO } from '../dtos/user/create-user.dto';
import { UserService } from '../services/user.service';
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  //TODO add guards to methods

  @Post('')
  async userRegistration(@Body() body: CreateUserDTO) {
    const result = await this._userService.registrateUser(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('find')
  async findUser() {
    const result = await this._userService.findUsers();
    return new ArbitrageResponse(new Result(result));
  }
  @Delete('/:id')
  async deleteUser(@Param() param: { id: string }) {
    const result = await this._userService.deleteUser(param.id);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('/:id/password')
  async resetPassword(@Param() param: { id: string }) {
    const result = await this._userService.resetPassword(param.id);
    return new ArbitrageResponse(new Result(result));
  }
}
