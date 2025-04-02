import express from "express";
import { UserController } from "../controllers/userController";
import { MongoUserRepository } from "../../../output/mongo/mongoUserRepository";
import { CreateUserInputPort } from "../../../../../application/ports/input/user/createUserInputPort";
import { validateUserFields } from "../middlewares/validateUserFields";

export const userRouter = express.Router();

const userRepository = new MongoUserRepository();
const createUserUseCase = new CreateUserInputPort(userRepository);
const userController = new UserController(createUserUseCase);

userRouter.post("/", validateUserFields, userController.create);
