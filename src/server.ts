import express from "express";

import { userRouter } from "./infrastructure/adapters/input/rest/routes/userRoutes";
import { errorHandler } from "./infrastructure/adapters/input/rest/middlewares/errorMiddleware";
import { associationRouter } from "./infrastructure/adapters/input/rest/routes/associationRoutes";
import { unitRouter } from "./infrastructure/adapters/input/rest/routes/unitRoutes";

export const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/associations", associationRouter);
app.use("/units", unitRouter);
app.use(errorHandler);
