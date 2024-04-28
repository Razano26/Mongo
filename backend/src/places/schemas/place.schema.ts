import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Place {
  @Prop()
  amenity: string; // 'bar', 'cafe', 'restaurant', etc.

  @Prop()
  name: string;

  @Prop()
  brand: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
