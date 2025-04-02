import express from "express";
import { UserController } from "../controllers/userController";
import { MongoUserRepository } from "../../../output/mongo/mongoUserRepository";
import { CreateUserInputPort } from "../../../../../application/ports/input/user/createUserInputPort";
import { validateUserFieldsForCreation } from "../middlewares/validateUserFieldsForCreation";
import { GetUsersInputPort } from "../../../../../application/ports/input/user/getUsersInputPort";
import { GetUserByIdInputPort } from "../../../../../application/ports/input/user/getUserByIdInputPort";
import { validateId } from "../middlewares/validateId";
import { UpdateUserInputPort } from "../../../../../application/ports/input/user/updateUserInputPort";
import { validateUserFieldsForUpdate } from "../middlewares/validateUserFieldsForUpdate";

export const userRouter = express.Router();

const userRepository = new MongoUserRepository();

const createUserUseCase = new CreateUserInputPort(userRepository);
const getUsersUseCase = new GetUsersInputPort(userRepository);
const getUserByIdUseCase = new GetUserByIdInputPort(userRepository);
const updateUserUseCase = new UpdateUserInputPort(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase
);

userRouter.post("/", validateUserFieldsForCreation, userController.create);
userRouter.get("/", userController.getAll);
userRouter.get("/:id", validateId, userController.getById);
userRouter.patch(
  "/:id",
  validateId,
  validateUserFieldsForUpdate,
  userController.update
);
