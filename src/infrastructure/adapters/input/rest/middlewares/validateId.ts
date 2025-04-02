import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from "joi";

const IdSchema = Joi.object({
  id: Joi.string().required(),
});

export const validateId = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    Joi.attempt(req.params, IdSchema);
    next();
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "details" in error &&
      Array.isArray(error.details)
    ) {
      throw createHttpError(400, error.details[0]?.message);
    }

    throw createHttpError(
      500,
      "Unexpected error in transaction. Try again later."
    );
  }
};
