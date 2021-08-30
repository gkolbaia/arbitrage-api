import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../member/schemas/user.schema';
import { UserService } from '../member/services/user.service';
import { SharedService } from './services/shared.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
