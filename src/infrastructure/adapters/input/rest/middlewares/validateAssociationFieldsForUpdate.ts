import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from "joi";

const AssociationSchema = Joi.object({
  name: Joi.string().strict(),
  address: Joi.string().strict(),
});

export const validateAssociationFieldsForUpdate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    Joi.attempt(req.body, AssociationSchema);
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
