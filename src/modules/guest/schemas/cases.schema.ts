import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Record } from 'src/modules/shared/classes/record.class';
import { CasePerson } from 'src/modules/shared/classes/case-person.class';
import { CaseStatusType } from '../enums/case-status.enum';
import { User } from '../../shared/classes/user.class';
import { ArbitrageMeeting } from 'src/modules/shared/classes/arbitrage-meeting.class';
import * as mongoose from 'mongoose';
export type CaseDocument = Case & Document;

@Schema()
export class Case {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: false })
  description: string;
  @Prop({ type: CasePerson, required: true })
  reporter: CasePerson;
  @Prop({ type: CasePerson, required: true })
  defendant: CasePerson;
  @Prop({ type: String, required: false })
  caseId: string;
  @Prop()
  reportFiles: any[];
  @Prop()
  defendantFiles: any[];
  @Prop()
  arbitrageFiles: any[];
  @Prop({ required: false, enum: CaseStatusType, default: 'DRAFT' })
  status: string;
  @Prop({ type: Record, default: new Record() })
  record: Record;
  @Prop({ type: User })
  arbitr: User;
  @Prop({ type: [mongoose.Schema.Types.Mixed], required: false })
  arbitrageMeetings: ArbitrageMeeting[];
}
export const CaseSchema = SchemaFactory.createForClass(Case);
