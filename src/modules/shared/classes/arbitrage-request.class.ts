import { IsNotEmpty, ValidateNested } from 'class-validator';

export abstract class ArbitrageRequest {
  @IsNotEmpty()
  @ValidateNested()
  abstract data: any;
  paging: {
    page: number;
    size: number;
  };
  sort: [
    {
      property: string;
      direction: string;
    },
  ];
}
