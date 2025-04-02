import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { validateFields } from "./utilitiesMiddleware";

export class UserMiddleware {
  private readonly creationSchema = Joi.object({
    names: Joi.string().strict(),
    lastNames: Joi.string().strict(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().strict().required(),
  });

  private readonly updateSchema = Joi.object({
    names: Joi.string().strict(),
    lastNames: Joi.string().strict(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().strict(),
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
