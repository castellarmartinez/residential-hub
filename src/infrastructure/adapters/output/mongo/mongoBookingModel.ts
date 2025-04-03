import { Schema, model } from "mongoose";

interface IBooking {
  _id: string;
  date?: string;
  timeStart?: string;
  timeEnd?: string;
  userId?: string;
  amenityId?: string;
  associationId?: string;
}

const bookingSchema = new Schema<IBooking>({
  _id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
  },
  timeStart: {
    type: String,
    required: false,
  },
  timeEnd: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    ref: "User",
  },
  amenityId: {
    type: String,
    ref: "Amenity",
  },
  associationId: {
    type: String,
    ref: "Association",
  },
});

export const MongoBooking = model<IBooking>("Booking", bookingSchema);
