import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [MemberModule, SharedModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static rootDir: string;
  public static configsDir: string;
  public static resourcesDir: string;

  constructor() {
    AppModule.rootDir = __dirname;
    AppModule.configsDir = `${__dirname}/configs`;
    AppModule.resourcesDir = `${__dirname}/resources`;
  }
}
