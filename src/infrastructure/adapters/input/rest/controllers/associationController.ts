import { NextFunction, Request, Response } from "express";
import { GetAssociationByIdUseCase } from "../../../../../application/usecases/association/getAssociationByIdUseCase";
import { CreateAssociationUseCase } from "../../../../../application/usecases/association/createAssociationUseCase";
import { GetAssociationsUseCase } from "../../../../../application/usecases/association/getAssociationsUseCase";
import { UpdateAssociationUseCase } from "../../../../../application/usecases/association/updateAssociationUseCase";
import { DeleteAssociationUseCase } from "../../../../../application/usecases/association/deleteAssociationUseCase";

export class AssociationController {
  constructor(
    private readonly createAssociationUseCase: CreateAssociationUseCase,
    private readonly getAssociationsUseCase: GetAssociationsUseCase,
    private readonly getAssociationByIdUseCase: GetAssociationByIdUseCase,
    private readonly updateAssociationUseCase: UpdateAssociationUseCase,
    private readonly deleteAssociationUseCase: DeleteAssociationUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, address } = req.body;

      const association = await this.createAssociationUseCase.execute(
        name,
        address
      );

      res.status(201).json({
        association,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const associations = await this.getAssociationsUseCase.execute();

      res.status(200).json({
        associations,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const association = await this.getAssociationByIdUseCase.execute(id);

      res.status(200).json({
        associations: association,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const association = await this.updateAssociationUseCase.execute(
        id,
        req.body
      );

      res.status(200).json({ association });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.deleteAssociationUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
