import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";
import * as constants from "../constants";

const passwordComplexity = {
  min: constants.passwordMinLength,
  max: constants.passwordMaxLength,
  lowerCase: constants.passwordLowercase,
  upperCase: constants.passwordUppercase,
  numeric: constants.passwordNumeric,
  symbol: constants.passwordSymbol,
  requirementCount: constants.passwordRequirementCount
};

export const userName = Joi.string()
  .min(constants.emailMinLength)
  .max(constants.emailMaxLength)
  .email();

export const userPassword = new PasswordComplexity(passwordComplexity);

export const userSchema = Joi.object({
  username: userName.required(),
  password: userPassword.required()
}).unknown(false);
