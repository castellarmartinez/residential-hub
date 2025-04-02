import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from "joi";

const UserSchema = Joi.object({
  names: Joi.string().strict(),
  lastNames: Joi.string().strict(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().strict(),
});

export const validateUserFieldsForUpdate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    Joi.attempt(req.body, UserSchema);
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
