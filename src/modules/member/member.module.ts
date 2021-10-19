import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { CaseSchema } from '../guest/schemas/cases.schema';
import { SharedModule } from '../shared/shared.module';
import { CasesController } from './controllers/cases.controller';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';
import { CasesService } from './services/cases.service';
import { ConfigsService } from './services/Config.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    // PassportModule,
    MongooseModule.forRootAsync({
      imports: [MemberModule],
      useFactory: async (configService: ConfigsService) =>
        configService.mongoStore,
      inject: [ConfigsService],
    }),
    MongooseModule.forFeature([{ name: 'Case', schema: CaseSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    SharedModule,
  ],
  controllers: [UserController, CasesController],
  providers: [ConfigsService, UserService, CasesService],
  exports: [ConfigsService],
})
export class MemberModule {}
