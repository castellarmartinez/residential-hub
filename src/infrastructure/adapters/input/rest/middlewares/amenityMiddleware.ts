import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateFields } from "./utilitiesMiddleware";

export class AmenityMiddleware {
  private readonly creationSchema = Joi.object({
    name: Joi.string().strict().required(),
    description: Joi.string().strict(),
    bookable: Joi.boolean().strict(),
    openingTime: Joi.string().strict(),
    closingTime: Joi.string().strict(),
    associationId: Joi.string().strict(),
  });

  private readonly updateSchema = Joi.object({
    name: Joi.string().strict(),
    description: Joi.string().strict(),
    bookable: Joi.boolean().strict(),
    openingTime: Joi.string().strict(),
    closingTime: Joi.string().strict(),
    associationId: Joi.string().strict(),
  })
    .min(1)
    .messages({
      "object.min": "At least one field is required to update the user",
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
    validateFields(req.body, this.updateSchema);
    next();
  };
}
