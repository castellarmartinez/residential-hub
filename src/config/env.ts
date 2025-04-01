import { config } from "dotenv";

config({ path: ".env" });

export default {
  HOST: String(process.env.HOST),
  PORT: String(process.env.PORT),
  MONGO_URL: String(process.env.MONGO_URL),
};
