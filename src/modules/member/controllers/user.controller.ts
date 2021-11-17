import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArbitrageResponse } from '../../shared/classes/arbitrage-response.class';
import { Result } from '../../shared/classes/arbitrage-result.class';
import { ChangePasswordDTO } from '../dtos/user/change-password.dto';
import { CreateUserDTO } from '../dtos/user/create-user.dto';
import { UserService } from '../services/user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { EditUserDTO } from '../dtos/user/edit-user.dto';
import { RolesGuard } from '../../auth/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  //TODO add guards to methods

  @Post('')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['SUPERADMIN']))
  async userRegistration(@Body() body: CreateUserDTO) {
    const result = await this._userService.registrateUser(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('find')
  @UseGuards(AuthGuard('jwt'))
  async findUser(@Body() body: any) {
    const result = await this._userService.findUsers(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('arbitr/find')
  @UseGuards(AuthGuard('jwt'))
  async findArbitrs(@Body() body: any) {
    const result = await this._userService.findArbitrs();
    return new ArbitrageResponse(new Result(result));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['SUPERADMIN']))
  async deleteUser(@Param() param: { id: string }) {
    const result = await this._userService.deleteUser(param.id);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('/:id/password')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['SUPERADMIN']))
  async resetPassword(@Param() param: { id: string }) {
    const result = await this._userService.resetPassword(param.id);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('/password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(@Req() req: Request, @Body() body: ChangePasswordDTO) {
    const result = await this._userService.changePassword(
      body.data,
      await req.user,
    );
    return new ArbitrageResponse(new Result(result));
  }
  @Put('/:_id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['SUPERADMIN']))
  async editUser(@Body() body: EditUserDTO, @Param() param: { _id: string }) {
    const result = await this._userService.editUser(param._id, body.data);
    return new ArbitrageResponse(new Result(result));
  }
}
