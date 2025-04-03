import { Schema, model } from "mongoose";

interface IBooking {
  _id: string;
  date?: string;
  timeStart?: string;
  timeEnd?: string;
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
});

export const MongoBooking = model<IBooking>("Booking", bookingSchema);
