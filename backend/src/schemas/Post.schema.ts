import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  comments: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
