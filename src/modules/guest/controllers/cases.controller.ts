import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArbitrageResponse } from 'src/modules/shared/classes/arbitrage-response.class';
import { Result } from 'src/modules/shared/classes/arbitrage-result.class';
import { AddDefendantFilesToCaseDTO } from '../dto/case/add-defendant-files-to-case.dto';
import { CreateCaseDTO } from '../dto/case/create-case.dto';
import { CasesService } from '../services/cases.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
@Controller('case')
export class CasesController {
  constructor(private readonly _caseService: CasesService) {}
  @Post('')
  async createCase(@Body() body: CreateCaseDTO) {
    const result = await this._caseService.createCase(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Get('/:caseId')
  async findCaseByNumber(@Param() param: { caseId: string }) {
    const result = await this._caseService.findCaseByCaseId(param.caseId);
    return new ArbitrageResponse(new Result(result));
  }
  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async findCaseByCaseUSer(@Req() req: Request) {
    const result = await this._caseService.findCaseByCaseUser(req.user);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('/defendant/files')
  async addDefendantFilesToCase(@Body() body: AddDefendantFilesToCaseDTO) {
    const result = await this._caseService.addDefendantFilesTocase(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Get('find/draft')
  async findCases() {
    const result = await this._caseService.findDraftCases();
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('reject/:id')
  async rejectCase(@Param() param: { id: string }) {
    const result = await this._caseService.rejectCase(param?.id);
    return new ArbitrageResponse(new Result(result));
  }
}
