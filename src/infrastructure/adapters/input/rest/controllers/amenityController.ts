import { NextFunction, Request, Response } from "express";
import { CreateAmenityUseCase } from "../../../../../application/usecases/amenity/createAmenityUseCase";
import { DeleteAmenityUseCase } from "../../../../../application/usecases/amenity/deleteAmenityUseCase";
import { GetAmenityByIdUseCase } from "../../../../../application/usecases/amenity/getAmenityByIdUseCase";
import { UpdateAmenityUseCase } from "../../../../../application/usecases/amenity/updateAmenityUseCase";
import { GetAmenitiesUseCase } from "../../../../../application/usecases/amenity/getAmenitiesUseCase";

export class AmenityController {
  constructor(
    private readonly createAmenityUseCase: CreateAmenityUseCase,
    private readonly getAmenitiesUseCase: GetAmenitiesUseCase,
    private readonly getAmenityByIdUseCase: GetAmenityByIdUseCase,
    private readonly updateAmenityUseCase: UpdateAmenityUseCase,
    private readonly deleteAmenityUseCase: DeleteAmenityUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        description,
        bookable,
        openingTime,
        closingTime,
        association,
      } = req.body;

      const amenity = await this.createAmenityUseCase.execute(
        name,
        description,
        bookable,
        openingTime,
        closingTime,
        association
      );

      res.status(201).json({
        user: amenity,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { association } = req.query;
      const amenities = await this.getAmenitiesUseCase.execute(
        association as string
      );

      res.status(200).json({
        amenities,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const amenity = await this.getAmenityByIdUseCase.execute(id);

      res.status(200).json({
        amenity,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const amenity = await this.updateAmenityUseCase.execute(id, req.body);

      res.status(200).json({ amenity });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.deleteAmenityUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
