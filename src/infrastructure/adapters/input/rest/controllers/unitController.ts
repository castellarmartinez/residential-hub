import { NextFunction, Request, Response } from "express";
import { CreateUnitUseCase } from "../../../../../application/usecases/unit/createUnitUseCase";
import { GetUnitsUseCase } from "../../../../../application/usecases/unit/getUnitsUseCase";
import { GetUnitByIdUseCase } from "../../../../../application/usecases/unit/getUnitByIdUseCase";
import { UpdateUnitUseCase } from "../../../../../application/usecases/unit/updateUnitUseCase";
import { DeleteUnitUseCase } from "../../../../../application/usecases/unit/deleteUnitUseCase";

export class UnitController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly getUnitsUseCase: GetUnitsUseCase,
    private readonly getUnitByIdUseCase: GetUnitByIdUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly deleteUnitUseCase: DeleteUnitUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, association, users } = req.body;

      const unit = await this.createUnitUseCase.execute(
        name,
        association,
        users
      );

      res.status(201).json({
        user: unit,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const units = await this.getUnitsUseCase.execute();

      res.status(200).json({
        units,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const unit = await this.getUnitByIdUseCase.execute(id);

      res.status(200).json({
        unit,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const unit = await this.updateUnitUseCase.execute(id, req.body);

      res.status(200).json({ unit });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.deleteUnitUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
