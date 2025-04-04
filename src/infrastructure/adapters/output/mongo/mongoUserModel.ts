import { Schema, model } from "mongoose";

interface IUser {
  _id: string;
  email: string;
  password: string;
  names?: string;
  lastNames?: string;
  associations?: string[];
  units?: string[];
}

const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  names: {
    type: String,
    required: false,
  },
  lastNames: {
    type: String,
    required: false,
  },
  associations: [
    {
      type: String,
      ref: "Association",
    },
  ],
  units: [
    {
      type: String,
      ref: "Unit",
    },
  ],
});

export const MongoUser = model<IUser>("User", userSchema);
