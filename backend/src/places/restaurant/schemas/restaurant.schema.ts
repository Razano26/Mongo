import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'restaurant' })
export class Restaurant extends Document {
  @Prop()
  amenity: string; 

  @Prop()
  name: string;

  @Prop()
  brand: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
