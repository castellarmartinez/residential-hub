import express from "express";

import { errorHandler } from "./infrastructure/adapters/input/rest/middlewares/errorMiddleware";
import { userRouter } from "./infrastructure/adapters/input/rest/routes/userRoutes";
import { associationRouter } from "./infrastructure/adapters/input/rest/routes/associationRoutes";
import { unitRouter } from "./infrastructure/adapters/input/rest/routes/unitRoutes";
import { amenityRouter } from "./infrastructure/adapters/input/rest/routes/amenityRoutes";

export const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/associations", associationRouter);
app.use("/units", unitRouter);
app.use("/amenities", amenityRouter);
app.use(errorHandler);
