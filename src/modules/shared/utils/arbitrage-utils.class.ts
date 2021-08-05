import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { AppModule } from '../../../app.module';

export class ArbitrageUtils {
  public static env(): string {
    return process.env.NODE_ENV || 'development';
  }

  public static readModuleConfig(module?: string): any {
    try {
      const path = module
        ? `${AppModule.configsDir}/${module}/config.json`
        : `${AppModule.configsDir}/config.json`;
      const config = ArbitrageUtils.readJSONFile(path);
      let env = process.env.NODE_ENV;
      if (!env) {
        Logger.warn(
          'NODE_ENV is not presented... gonna use development as default',
        );
        env = 'development';
      }

      return config[env] ? config[env] : null;
    } catch (e) {
      Logger.error(`error: ${e}`);
      return null;
    }
  }

  public static readJSONFile(path: string): any {
    try {
      const file = fs.readFileSync(path);
      return JSON.parse(file.toString('utf-8'));
    } catch (e) {
      Logger.error(`error: ${e}`);
      return null;
    }
  }
}
