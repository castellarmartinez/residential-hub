import config from "./src/config/env";
import { connectToMongoDatabase } from "./src/config/mongoDB";
import { connectToPostgresDatabase } from "./src/config/postgreSQL";
import { associateModels } from "./src/infrastructure/adapters/output/postgres/postgresRelationshipsModel";
import { app } from "./src/server";

const DEFAULT_PORT = 3000;
const PORT = config.PORT ?? DEFAULT_PORT;

async function startServer() {
  try {
    await Promise.all([connectToMongoDatabase(), connectToPostgresDatabase()]);
    associateModels();

    app.listen(PORT, () => {
      console.log(`Server up and running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error while trying to start the server:", error);
  }
}

startServer();
