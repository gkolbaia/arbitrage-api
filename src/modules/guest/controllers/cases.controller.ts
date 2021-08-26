import { Body, Controller, Post } from '@nestjs/common';
import { CasesService } from '../services/cases.service';

@Controller('case')
export class CasesController {
  constructor(private readonly _caseService: CasesService) {}
  @Post('')
  async createCase(@Body() body: any) {
    const result = await this._caseService.createCase(body.data);
    return result;
  }
}
