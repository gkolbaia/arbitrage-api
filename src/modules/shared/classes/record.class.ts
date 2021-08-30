export class Record {
  state: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  constructor(record?: Record) {
    this.state = record?.state ? record.state : 'ACTIVE';
    this.createdAt = record?.createdAt ? record.createdAt : new Date();
    this.isDeleted = record?.isDeleted ? record.isDeleted : false;
  }
}
