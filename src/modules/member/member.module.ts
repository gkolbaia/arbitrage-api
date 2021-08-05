import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './controllers/users.controller';
import { UserSchema } from './schemas/user.schema';
import { ConfigsService } from './services/Config.service';
import { UsersService } from './services/users.service';

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
  controllers: [UsersController],
  providers: [ConfigsService, UsersService],
  exports: [ConfigsService, PassportModule, UsersService],
})
export class MemberModule {}
