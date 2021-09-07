import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArbitrageResponse } from 'src/modules/shared/classes/arbitrage-response.class';
import { Result } from 'src/modules/shared/classes/arbitrage-result.class';
import { CreateCaseDTO } from '../dto/case/create-case.dto';
import { CasesService } from '../services/cases.service';

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
    const result = await this._caseService.findCaseByCaseId(
      param.caseId,
    );
    return new ArbitrageResponse(new Result(result));
  }
}
