import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'bar' })
export class Bar extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'bar' })
  amenity: string;

  @Prop()
  brand?: string;
}

export const BarSchema = SchemaFactory.createForClass(Bar);
