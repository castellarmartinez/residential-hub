import { Schema, model } from "mongoose";

interface IUser {
  id: string;
  email: string;
  password: string;
  names?: string;
  lastNames?: string;
}

const userSchema = new Schema<IUser>({
  id: {
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

export const Users = model<IUser>("User", userSchema);
