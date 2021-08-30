import { Result } from "./arbitrage-result.class";

export class ArbitrageResponse<T> {
  result: Result<T>;
  errors: [
    {
      keyword: string;
    },
  ];
  constructor(result?: Result<T>, errors?: [{ keyword: string }]) {
    this.result = result;
    this.errors = errors;
  }
}
