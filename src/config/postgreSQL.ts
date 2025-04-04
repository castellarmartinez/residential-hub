import { Sequelize } from "sequelize";
import fs from "node:fs";
import path from "node:path";

import config from "./env";

const systemSequelize = new Sequelize(
  "postgres", // Default database to connect in order to create the new database
  config.POSTGRES_USER,
  config.POSTGRES_PASS,
  {
    host: config.POSTGRES_HOST,
    dialect: "postgres",
    port: config.POSTGRES_PORT,
    logging: false,
  }
);

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.POSTGRES_USER,
  config.POSTGRES_PASS,
  {
    host: config.POSTGRES_HOST,
    dialect: "postgres",
    port: config.POSTGRES_PORT,
    logging: false,
  }
);

export async function connectToPostgresDatabase() {
  try {
    const [results] = await systemSequelize.query(
      `SELECT 1 FROM pg_database WHERE datname='${config.DB_NAME}'`
    );

    if (results.length === 0) {
      // If the database does not exist it is created
      await systemSequelize.query(`CREATE DATABASE "${config.DB_NAME}"`);
    }

    await systemSequelize.close(); // Close the system connection to connect the project database
    await sequelize.authenticate();
    await createTables();
    console.info("Connected to PostgreSQL database.");
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    console.error(error);
    console.info(
      "The process has finished due to a bad connection to postgres.\nPlease restart the process."
    );
    process.exit(0);
  }
}

export async function disconnectFromPostgresDatabase() {
  try {
    await sequelize.close();
  } catch (error) {
    if (error instanceof Error) {
      error = `Database error: ${error.message}`;
    }

    console.error(error);
  }
}

async function createTables() {
  try {
    const schemaPath = path.resolve(__dirname, "../migrations/schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");

    await sequelize.query(sql);
  } catch (error) {
    console.error("Error running schema SQL:", error);
  }
}
