import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { validateFields } from "./utilitiesMiddleware";

export class AssociationMiddleware {
  private readonly creationSchema = Joi.object({
    name: Joi.string().strict().required(),
    address: Joi.string().strict(),
  });

  private readonly updateSchema = Joi.object({
    name: Joi.string().strict(),
    address: Joi.string().strict(),
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
