import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from '../guards/role.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
  @Get('token')
  @UseGuards(AuthGuard(), new RolesGuard(['SUPERADMIN']))
  tempAuth() {
    return { auth: 'works' };
  }
  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const user = await this.authService.login(body.user);
    if (!user) {
      throw new HttpException(
        'User_Name_Or_Password_Is_incorec',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      username: user.username,
      _id: user._id,
    };
    const token = await this.authService.signPayload(payload);
    return res.set({ 'access-token': token }).json(user);
  }
}
