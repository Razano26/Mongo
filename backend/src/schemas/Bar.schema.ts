import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'bar' })
export class Bar extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'bar' })
  amenity: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }] })
  tags: Types.ObjectId[];
}

export const BarSchema = SchemaFactory.createForClass(Bar);