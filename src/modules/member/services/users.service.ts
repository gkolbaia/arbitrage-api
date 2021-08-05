import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}
  async create(user: any) {
    const saltOrRounds = 10;
    user.password = await bcrypt.hash(user.password, saltOrRounds);
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
  async findUserByUserName(username: string) {
    return await this.userModel.findOne({ username });
  }
  async findUser(_id: string) {
    return await this.userModel.findOne({ _id });
  }
  async changePassword(_id: string, password: string): Promise<any> {
    const newPassword = await bcrypt.hash(password, 10);
    const result = await this.userModel.findOneAndUpdate(
      { _id },
      { $set: { password: newPassword } },
      { useFindAndModify: false },
    );
    return result;
  }
}
