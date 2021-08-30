import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Record } from 'src/modules/shared/classes/record.class';
import { CasePerson } from 'src/modules/shared/classes/case-person.class';
import { CaseStatusType } from '../enums/case-status.enum';
export type CaseDocument = Case & Document;

@Schema()
export class Case {
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
  @Prop({ required: false, enum: CaseStatusType, default: 'DRAFT' })
  status: string;
  @Prop({ type: Record, default: new Record() })
  record: Record;
}
export const CaseSchema = SchemaFactory.createForClass(Case);