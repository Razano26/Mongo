import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'restaurant' })
export class Restaurant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'restaurant' })
  amenity: string;

  @Prop()
  brand?: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);