import express from "express";

import { userRouter } from "./infrastructure/adapters/input/rest/routes/userRoutes";
import { errorHandler } from "./infrastructure/adapters/input/rest/middlewares/errorHandler";
import { associationRouter } from "./infrastructure/adapters/input/rest/routes/associationRoutes";

export const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/associations", associationRouter);
app.use(errorHandler);
