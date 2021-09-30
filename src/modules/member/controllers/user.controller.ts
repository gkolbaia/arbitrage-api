import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArbitrageResponse } from 'src/modules/shared/classes/arbitrage-response.class';
import { Result } from 'src/modules/shared/classes/arbitrage-result.class';
import { ChangePasswordDTO } from '../dtos/user/change-password.dto';
import { CreateUserDTO } from '../dtos/user/create-user.dto';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  //TODO add guards to methods

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  async userRegistration(@Body() body: CreateUserDTO) {
    const result = await this._userService.registrateUser(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('find')
  @UseGuards(AuthGuard('jwt'))
  async findUser() {
    const result = await this._userService.findUsers();
    return new ArbitrageResponse(new Result(result));
  }
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param() param: { id: string }) {
    const result = await this._userService.deleteUser(param.id);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('/:id/password')
  @UseGuards(AuthGuard('jwt'))
  async resetPassword(@Param() param: { id: string }) {
    const result = await this._userService.resetPassword(param.id);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('/password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(@Req() req: Request, @Body() body: ChangePasswordDTO) {
    const result = await this._userService.changePassword(body.data, await req.user);
    return new ArbitrageResponse(new Result(result));
  }
}
