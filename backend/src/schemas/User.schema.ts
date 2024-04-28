import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';
import { Post } from './Post.schema';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  email?: string;

  // Relation one-to-one
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;

  // Relation one-to-many
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
