import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'fast_food' })
export class Fast_Food extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'fast_food' })
  amenity: string;

  @Prop()
  brand?: string;
}

export const Fast_FoodSchema = SchemaFactory.createForClass(Fast_Food);