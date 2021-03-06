import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ArbitrageResponse } from '../../shared/classes/arbitrage-response.class';
import { Result } from '../../shared/classes/arbitrage-result.class';

import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CasesService } from '../services/cases.service';
import { SearchCaseDTO } from '../dtos/case/search-case.dto';
import { FindCasesDTO } from '../dtos/case/find-cases.dto';
import { RolesGuard } from '../../auth/guards/role.guard';
import { AddArbitrageFilesToCaseDTO } from '../../member/dtos/case/add-arbitrage-files-to-case.dto';
import { ChangeCaseStatusDTO } from '../dtos/case/change-case-status.dto';
import { EditCaseDTO } from '../dtos/case/edit-case.dto';
import { AddArbitrageMeetingDTO } from '../dtos/case/add-arbitrage-meeting.dto';
@Controller('case')
export class CasesController {
  constructor(private readonly _caseService: CasesService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async findCaseByCaseUser(@Req() req: Request) {
    const result = await this._caseService.findCaseByCaseUser(req.user);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('find')
  @UseGuards(AuthGuard('jwt'))
  async findCases(@Body() body: FindCasesDTO, @Req() req: Request) {
    const result = await this._caseService.findDraftCases(
      body.data,
      body.paging,
      req.user,
    );
    return new ArbitrageResponse(new Result(result.data, result.page));
  }
  @Patch('reject/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ARBITR']))
  async rejectCase(@Param() param: { id: string }) {
    const result = await this._caseService.rejectCase(param?.id);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('bind/user/case/:caseId')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['PRESIDENT']))
  async bindUsersToCase(@Param() param: { caseId: string }, @Body() body: any) {
    const result = await this._caseService.bindUsersToCase(
      param.caseId,
      body.data,
    );
    return new ArbitrageResponse(new Result(result));
  }

  @Post('search')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ARBITR']))
  async search(@Body() body: SearchCaseDTO) {
    const result = await this._caseService.search(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('/arbitrage/files')
  @UseGuards(AuthGuard('jwt'))
  async addarbitrageFilesToCase(@Body() body: AddArbitrageFilesToCaseDTO) {
    const result = await this._caseService.addArbitrageFilesToCase(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Patch('/status')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ARBITR']))
  async changeCaseStatus(
    @Body() body: ChangeCaseStatusDTO,
    @Req() req: Request,
  ) {
    const result = await this._caseService.changeCaseStatus(
      body.data,
      req.user,
    );
    return new ArbitrageResponse(new Result(result));
  }
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['SUPERADMIN']))
  async editCase(@Body() body: EditCaseDTO, @Param() param: { id: string }) {
    body.data._id = param.id;
    const result = await this._caseService.editCase(body.data);
    return new ArbitrageResponse(new Result(result));
  }
  @Post('/:id/meeting')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['ARBITR']))
  async addArbitrageMeeting(
    @Body() body: AddArbitrageMeetingDTO,
    @Param() param: { id: string },
  ) {
    body.data._id = param.id;
    const result = await this._caseService.addArbitrageMeeting(body.data);
    return new ArbitrageResponse(new Result(result));
  }
}
