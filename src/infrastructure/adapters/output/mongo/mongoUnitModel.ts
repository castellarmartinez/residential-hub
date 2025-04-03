import { Schema, model } from "mongoose";

interface IUnit {
  _id: string;
  name: string;
  associationId?: string;
  users?: string[];
}

const unitSchema = new Schema<IUnit>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  associationId: {
    type: String,
    ref: "Association",
  },
  users: [
    {
      type: String,
      ref: "User",
    },
  ],
});

export const MongoUnit = model<IUnit>("Unit", unitSchema);
