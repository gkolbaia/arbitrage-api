import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reporter } from 'src/modules/shared/classes/reporter.class';
import { Record } from "src/modules/shared/classes/record.class";
export type CaseDocument = Case & Document;

@Schema()
export class Case {
  @Prop({ type: Reporter, required: true })
  reporter: Reporter;
  @Prop({ type: Reporter, required: true })
  defendant: Reporter;
  @Prop({ type: String, required: false })
  caseId: string;
  @Prop()
  reporterFiles: any[];
  @Prop()
  defendantFiles: any[];
  @Prop({ required: false, type: Record })
  record: Record;
}
export const CaseSchema = SchemaFactory.createForClass(Case);
