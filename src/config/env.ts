import { config } from "dotenv";

config({ path: ".env" });

export default {
  HOST: String(process.env.HOST),
  PORT: String(process.env.PORT),
  DB_NAME: String(process.env.DB_NAME),
  MONGO_URI: String(process.env.MONGO_URI),
  POSTGRES_USER: String(process.env.POSTGRES_USER),
  POSTGRES_PASS: String(process.env.POSTGRES_PASS),
  POSTGRES_HOST: String(process.env.POSTGRES_HOST),
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
};
