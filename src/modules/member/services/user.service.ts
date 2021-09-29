import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserData } from '../dtos/user/create-user.dto';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}
  async registrateUser(user: CreateUserData) {
    user.password = await bcrypt.hash('123456', 10);
    user.type = 'USER';
    const newUser = await new this.userModel(user).save();
    return newUser;
  }
  async findUsers() {
    const result = await this.userModel.find({ type: 'USER' });
    return result;
  }
  async deleteUser(_id: string) {
    const result = await this.userModel.deleteOne({ _id });
    return result;
  }
  async resetPassword(_id: string) {
    const password = await bcrypt.hash('123456', 10);
    const result = await this.userModel.findOneAndUpdate(
      { _id },
      { $set: { password } },
      { new: true },
    );
    return result;
  }
}
