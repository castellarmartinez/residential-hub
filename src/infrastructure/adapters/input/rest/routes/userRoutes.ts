import express from "express";
import { UserController } from "../controllers/userController";
import { MongoUserRepository } from "../../../output/mongo/mongoUserRepository";
import { CreateUserInputPort } from "../../../../../application/ports/input/user/createUserInputPort";
import { validateUserFields } from "../middlewares/validateUserFields";
import { GetUsersInputPort } from "../../../../../application/ports/input/user/getUsersInputPort";

export const userRouter = express.Router();

const userRepository = new MongoUserRepository();

const createUserUseCase = new CreateUserInputPort(userRepository);
const getUsersUseCase = new GetUsersInputPort(userRepository);

const userController = new UserController(createUserUseCase, getUsersUseCase);

userRouter.post("/", validateUserFields, userController.create);
userRouter.get("/", userController.getAll);
