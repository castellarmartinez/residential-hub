import { Schema, model } from "mongoose";

interface IUser {
  _id: string;
  email: string;
  password: string;
  names?: string;
  lastNames?: string;
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
});

export const MongoUser = model<IUser>("User", userSchema);
