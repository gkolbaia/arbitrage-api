export class Result<T> {
  data: T;
  dataType: string;
  page: {
    total?: number;
    number: number;
    size: number;
  };
  sort: [
    {
      property: string;
      direction: string;
    },
  ];
  constructor(
    data: any,
    page?: {
      number: number;
      size: number;
      totalPages?: number;
      totalCount?: number;
    },
    sort?: [{ property: string; direction: string }],
  ) {
    this.data = data;
    this.page = page;
    this.sort = sort;
  }
}
