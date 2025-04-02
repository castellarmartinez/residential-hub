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
    required: false,
  },
  users: {
    type: [String],
    required: false,
  },
});

export const MongoUnit = model<IUnit>("Unit", unitSchema);
