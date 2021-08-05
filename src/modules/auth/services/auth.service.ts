import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/member/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async findUserById(payload): Promise<any> {
    const { _id } = payload;
    return await this.userModel.findOne({ _id });
  }
  async login(credentials: { username: string; password: string }) {
    const user = await this.userModel.findOne({
      username: credentials.username,
    });
    if (!user) {
      return;
    }
    if (await bcrypt.compare(credentials.password, user.password)) {
      return user;
    } else {
      return null;
    }
  }
  async signPayload(payload: any) {
    return sign(payload, 'secretKey', { expiresIn: '1h' });
  }
}
