import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/member/schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SharedService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}
  async createCaseUser(caseId: string) {
    const userCredentials = this.generateRandomNumberCredentials();
    const password = await bcrypt.hash(userCredentials.password, 10);
    const user = {
      caseId,
      username: userCredentials.username,
      password: password,
      type: 'CASE',
    };
    const result = await new this.userModel(user).save();
    return await { result, password: userCredentials.password };
  }
  generateRandomNumberCredentials(): { username: string; password: string } {
    const username = String(Math.floor(Math.random() * 10000000000 + 1));
    const password = String(Math.floor(Math.random() * 10000000 + 1));
    return { username, password };
  }
}
