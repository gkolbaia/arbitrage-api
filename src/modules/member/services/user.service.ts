import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserData } from '../dtos/user/create-user.dto';
import { UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ChangePasswordData } from '../dtos/user/change-password.dto';

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
  async changePassword(passwordForm: ChangePasswordData, user: any) {
    const neededUser = await this.userModel.findOne({ _id: user._id });
    if (neededUser) {
      const passwordCheck = await bcrypt.compare(
        passwordForm.password,
        neededUser.password,
      );
      if (passwordCheck) {
        const password = await bcrypt.hash(passwordForm.newPassword, 10);
        const result = await this.userModel.findOneAndUpdate(
          { _id: user._id },
          { $set: { password } },
          { new: true },
        );
        return result;
      } else {
        throw new HttpException('Old Password Is incorrect', 400);
      }
    } else {
      throw new HttpException('unauthorized', 403);
    }
  }
}
