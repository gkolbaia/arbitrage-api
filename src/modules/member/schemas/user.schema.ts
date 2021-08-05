import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from 'src/modules/member/enums/user-type.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, enum: UserType })
  type: string;
  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: true })
  pid: string;
  @Prop({ type: [String], required: false })
  roles: [string];
  @Prop({ type: String, required: false })
  userId: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
