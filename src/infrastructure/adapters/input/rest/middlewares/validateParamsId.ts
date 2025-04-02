import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateFields } from "./utilitiesMiddleware";

const IdSchema = Joi.object({
  id: Joi.string().required(),
});

export const validateId = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  validateFields(req.params, IdSchema);
  next();
};
