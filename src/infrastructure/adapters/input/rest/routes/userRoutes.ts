import express from "express";
import { UserController } from "../controllers/userController";
import { MongoUserRepository } from "../../../output/mongo/mongoUserRepository";
import { CreateUserInputPort } from "../../../../../application/ports/input/user/createUserInputPort";
import { validateUserFields } from "../middlewares/validateUserFields";
import { GetUsersInputPort } from "../../../../../application/ports/input/user/getUsersInputPort";
import { GetUserByIdInputPort } from "../../../../../application/ports/input/user/getUserByIdInputPort";
import { validateId } from "../middlewares/validateId";

export const userRouter = express.Router();

const userRepository = new MongoUserRepository();

const createUserUseCase = new CreateUserInputPort(userRepository);
const getUsersUseCase = new GetUsersInputPort(userRepository);
const getUserByIdUseCase = new GetUserByIdInputPort(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUsersUseCase,
  getUserByIdUseCase
);

userRouter.post("/", validateUserFields, userController.create);
userRouter.get("/", userController.getAll);
userRouter.get("/:id", validateId, userController.getById);
