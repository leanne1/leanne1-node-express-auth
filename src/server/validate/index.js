import Joi from "joi";
import { userSchema } from "./user";
import { authSchema } from "./auth";

export const validate = (object, schema) =>
  Joi.validate(object, schema, { abortEarly: false }).error;

export const getInvalidErrorMessages = error =>
  error.details.map(d => d.message).join(", ");

export const validateUser = user => validate(user, userSchema);
export const validateAuth = auth => validate(auth, authSchema);
