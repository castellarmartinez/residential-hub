import { Schema, model } from "mongoose";

interface IAmenity {
  _id: string;
  name: string;
  description: string;
  bookable: boolean;
  openingTime: string;
  closingTime: string;
  associationId?: string;
}

const amenitySchema = new Schema<IAmenity>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  bookable: {
    type: Boolean,
    required: false,
  },
  openingTime: {
    type: String,
    required: false,
  },
  closingTime: {
    type: String,
    required: false,
  },
  associationId: {
    type: String,
    ref: "Association",
  },
});

export const MongoAmenity = model<IAmenity>("Amenity", amenitySchema);
