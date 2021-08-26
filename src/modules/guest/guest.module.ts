import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigsService } from '../member/services/Config.service';
import { CasesController } from './controllers/cases.controller';
import { FilesController } from './controllers/files.controller';
import { CaseSchema } from './schemas/cases.schema';
import { CasesService } from './services/cases.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Case', schema: CaseSchema }])],
  controllers: [FilesController, CasesController],
  providers: [ConfigsService, CasesService],
  exports: [ConfigsService],
})
export class GuestModule {}
