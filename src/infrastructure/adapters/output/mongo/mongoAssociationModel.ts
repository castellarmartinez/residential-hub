import { Schema, model } from "mongoose";

interface IAssociation {
  _id: string;
  name: string;
  address?: string;
}

const associationSchema = new Schema<IAssociation>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
});

export const MongoAssociation = model<IAssociation>("Association", associationSchema);
