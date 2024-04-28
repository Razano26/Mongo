import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Place {
  @Prop({ required: true })
  amenity: string; // 'bar', 'cafe', 'restaurant', etc.

  @Prop({ required: true })
  name: string;

  @Prop()
  brand: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
