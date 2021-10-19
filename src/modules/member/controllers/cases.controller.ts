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

import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CasesService } from '../services/cases.service';
import { SearchCaseDTO } from '../dtos/case/search-case.dto';
import { FindCasesDTO } from '../dtos/case/find-cases.dto';
@Controller('case')
export class CasesController {
  constructor(private readonly _caseService: CasesService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async findCaseByCaseUSer(@Req() req: Request) {
    const result = await this._caseService.findCaseByCaseUser(req.user);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('find')
  @UseGuards(AuthGuard('jwt'))
  async findCases(@Body() body: FindCasesDTO) {
    const result = await this._caseService.findDraftCases(
      body.data,
      body.paging,
    );
    return new ArbitrageResponse(new Result(result.data,result.page));
  }
  @Patch('reject/:id')
  @UseGuards(AuthGuard('jwt'))
  async rejectCase(@Param() param: { id: string }) {
    const result = await this._caseService.rejectCase(param?.id);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('bind/user/:userId/case/:caseId')
  @UseGuards(AuthGuard('jwt'))
  async bindUserToCase(@Param() param: { userId: string; caseId: string }) {
    const result = await this._caseService.bindUserToCase(param);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('search')
  @UseGuards(AuthGuard('jwt'))
  async search(@Body() body: SearchCaseDTO) {
    const result = await this._caseService.search(body.data);
    return new ArbitrageResponse(new Result(result));
  }
}
