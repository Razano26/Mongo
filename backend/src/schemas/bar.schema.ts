import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'bar' })
export class Bar extends Document {
  @Prop()
  amenity: string;

  @Prop()
  name: string;

  @Prop()
  brand: string;
}

export const BarSchema = SchemaFactory.createForClass(Bar);
