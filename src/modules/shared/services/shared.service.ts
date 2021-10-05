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
    const user = {
      caseId,
      ...userCredentials,
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
  async getUserByCaseId(caseId: string) {
    const result = await this.userModel.findOne({ caseId });
    return result;
  }
}
