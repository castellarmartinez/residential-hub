import mongoose from "mongoose";

import config from "./env";

export async function connectToMongoDatabase() {
  const uri = config.MONGO_URI + config.DB_NAME;

  try {
    await mongoose.connect(uri);
    console.info("Connected to MongoDB database.");
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    console.error(error);
    console.info(
      "The process has finished due to a bad connection to mongo.\nPlease restart the process."
    );
    process.exit(0);
  }
}

export async function disconnectFromMongoDatabase() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    console.error(error);
  }
}
