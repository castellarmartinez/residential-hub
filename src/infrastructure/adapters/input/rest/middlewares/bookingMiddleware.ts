import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateFields } from "./utilitiesMiddleware";

export class BookingMiddleware {
  private readonly creationSchema = Joi.object({
    date: Joi.string().strict(),
    timeStart: Joi.string().strict(),
    timeEnd: Joi.string().strict(),
    userId: Joi.string().strict(),
    associationId: Joi.string().strict(),
    amenityId: Joi.string().strict(),
  });

  validateCreationFields = (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    validateFields(req.body, this.creationSchema);
    next();
  };

  validateUpdateFields = (req: Request, _res: Response, next: NextFunction) => {
    validateFields(req.body, this.creationSchema);
    next();
  };
}
