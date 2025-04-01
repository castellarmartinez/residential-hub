import { NextFunction, Request, Response } from "express";

import { CreateUserUseCase } from "../../../../../application/usecases/user/createUserUseCase";

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

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
}
