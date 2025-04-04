import { NextFunction, Request, Response } from "express";

import { CreateUserUseCase } from "../../../../../application/usecases/user/createUserUseCase";
import { GetUsersUseCase } from "../../../../../application/usecases/user/getUsersUseCase";
import { GetUserByIdUseCase } from "../../../../../application/usecases/user/getUserByIdUseCase";
import { UpdateUserUseCase } from "../../../../../application/usecases/user/updateUserUseCase";
import { DeleteUserUseCase } from "../../../../../application/usecases/user/deleteUserUseCase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, names, lastNames, associations, units } =
        req.body;

      const user = await this.createUserUseCase.execute(
        email,
        password,
        names,
        lastNames,
        associations,
        units
      );

      res.status(201).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { association } = req.query;
      const users = await this.getUsersUseCase.execute(association as string);

      res.status(200).json({
        users,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await this.getUserByIdUseCase.execute(id);

      res.status(200).json({
        users: user,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await this.updateUserUseCase.execute(id, req.body);

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.deleteUserUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
