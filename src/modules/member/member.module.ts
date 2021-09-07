import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';
import { ConfigsService } from './services/Config.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MemberModule],
      useFactory: async (configService: ConfigsService) =>
        configService.mongoStore,
      inject: [ConfigsService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [ConfigsService, UserService],
  exports: [ConfigsService, PassportModule],
})
export class MemberModule {}
