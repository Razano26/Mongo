import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'pub' })
export class Pub extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'pub' })
  amenity: string;

  @Prop()
  brand?: string;
}

export const PubSchema = SchemaFactory.createForClass(Pub);