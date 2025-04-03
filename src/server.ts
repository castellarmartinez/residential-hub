import express from "express";

import { errorHandler } from "./infrastructure/adapters/input/rest/middlewares/errorMiddleware";
import { amenityRouter } from "./infrastructure/adapters/input/rest/routes/amenityRoutes";
import { associationRouter } from "./infrastructure/adapters/input/rest/routes/associationRoutes";
import { bookingRouter } from "./infrastructure/adapters/input/rest/routes/bookingRoutes";
import { unitRouter } from "./infrastructure/adapters/input/rest/routes/unitRoutes";
import { userRouter } from "./infrastructure/adapters/input/rest/routes/userRoutes";

export const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/associations", associationRouter);
app.use("/units", unitRouter);
app.use("/amenities", amenityRouter);
app.use("/bookings", bookingRouter);
app.use(errorHandler);
