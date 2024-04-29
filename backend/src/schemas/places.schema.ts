// enseigne.schema.ts
import { Schema, Document } from 'mongoose';

export const PlacesSchema = new Schema(
  {},
  { collection: 'places', strict: false },
);
export interface PlaceDocument extends Document {
  // vous pouvez ajouter des propriétés spécifiques ici si nécessaire
}
