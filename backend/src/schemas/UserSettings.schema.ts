import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ required: false })
  receiveEmails?: boolean;

  @Prop({ required: false })
  active?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
