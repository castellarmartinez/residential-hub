import mongoose from "mongoose";

import config from "./env";

export async function connectToDatabase() {
  const uri = config.MONGO_URI + config.DB_NAME;

  try {
    await mongoose.connect(uri);
    console.info("Connected to the database.");
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    console.error(error);
    console.info("The process has finished.\nPlease restart the process.");
    process.exit(0);
  }
}

export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    console.error(error);
  }
}
