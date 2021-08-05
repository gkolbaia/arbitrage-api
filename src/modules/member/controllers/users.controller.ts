import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('register')
  async userRegistration(@Body() body: any) {
    return await this.userService.create(body);
  }
  @Post('login')
  async login(@Body() body: any) {
    console.log(body);
  }
  @Post('change/password')
  async changePassword(@Body() body: any) {
    return await this.userService.changePassword(body._id, body.password);
  }
}
