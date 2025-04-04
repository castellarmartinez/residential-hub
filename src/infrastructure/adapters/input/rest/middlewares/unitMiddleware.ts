import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateFields } from "./utilitiesMiddleware";

export class UnitMiddleware {
  private readonly creationSchema = Joi.object({
    name: Joi.string().strict().required(),
    associationId: Joi.string().strict(),
    users: Joi.array().items(Joi.string()),
  });

  private readonly updateSchema = Joi.object({
    name: Joi.string().strict(),
    associationId: Joi.string().strict(),
    users: Joi.array().items(Joi.string()),
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
