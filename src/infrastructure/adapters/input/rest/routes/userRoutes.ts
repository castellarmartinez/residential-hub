import express from "express";
import { UserController } from "../controllers/userController";
// import { MongoUserRepository } from "../../../output/mongo/mongoUserRepository";
import { CreateUserInputPort } from "../../../../../application/ports/input/user/createUserInputPort";
import { DeleteUserInputPort } from "../../../../../application/ports/input/user/deleteUserInputPort";
import { GetUserByIdInputPort } from "../../../../../application/ports/input/user/getUserByIdInputPort";
import { GetUsersInputPort } from "../../../../../application/ports/input/user/getUsersInputPort";
import { UpdateUserInputPort } from "../../../../../application/ports/input/user/updateUserInputPort";
import { PostgresUserRepository } from "../../../output/postgres/postgresUserRepository";
import { UserMiddleware } from "../middlewares/userMiddleware";
import { validateId } from "../middlewares/validateParamsId";

export const userRouter = express.Router();

// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserInputPort(userRepository);
const getUsersUseCase = new GetUsersInputPort(userRepository);
const getUserByIdUseCase = new GetUserByIdInputPort(userRepository);
const updateUserUseCase = new UpdateUserInputPort(userRepository);
const deleteUserUseCase = new DeleteUserInputPort(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase
);

const userMiddleware = new UserMiddleware();

userRouter.post(
  "/",
  userMiddleware.validateCreationFields,
  userController.create
);

userRouter.get("/", userController.getAll);

userRouter.get("/:id", validateId, userController.getById);

userRouter.patch(
  "/:id",
  validateId,
  userMiddleware.validateUpdateFields,
  userController.update
);

userRouter.delete("/:id", validateId, userController.delete);
