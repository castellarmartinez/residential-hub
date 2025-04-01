import express from "express";

import { userRouter } from "./infrastructure/adapters/input/rest/routes/userRoutes";

export const app = express();

app.use(express.json());
app.use("/users", userRouter);
