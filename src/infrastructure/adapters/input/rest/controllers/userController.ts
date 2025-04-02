import { NextFunction, Request, Response } from "express";

import { CreateUserUseCase } from "../../../../../application/usecases/user/createUserUseCase";
import { GetUsersUseCase } from "../../../../../application/usecases/user/getUsersUseCase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, names, lastNames } = req.body;

      const user = await this.createUserUseCase.execute(
        email,
        password,
        names,
        lastNames
      );

      res.status(201).json({
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.getUsersUseCase.execute();

      res.status(200).json({
        users,
      });
    } catch (error) {
      next(error);
    }
  };
}
