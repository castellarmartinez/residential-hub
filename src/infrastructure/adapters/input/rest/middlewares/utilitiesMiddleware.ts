import createHttpError from "http-errors";
import Joi from "joi";

export function validateFields(
  fields: unknown,
  schema: Joi.ObjectSchema<unknown>
) {
  try {
    Joi.attempt(fields, schema);
  } catch (error) {
    checkForInvalidFieldErrors(error);

    throw createHttpError(
      500,
      "Unexpected error in transaction. Try again later."
    );
  }
}

function checkForInvalidFieldErrors(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "details" in error &&
    Array.isArray(error.details)
  ) {
    throw createHttpError(400, error.details[0]?.message);
  }
}
