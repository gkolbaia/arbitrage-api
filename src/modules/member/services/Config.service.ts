import { Injectable } from '@nestjs/common';
import { ArbitrageUtils } from '../../shared/utils/arbitrage-utils.class';

@Injectable()
export class ConfigsService {
  public readonly mongoStore: any;

  constructor() {
    const config = ArbitrageUtils.readModuleConfig('member');

    this.mongoStore = config.mongodb.store;
  }
}
