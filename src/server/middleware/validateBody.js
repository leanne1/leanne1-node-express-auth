import { getInvalidErrorMessages } from "../validate";

// eslint-disable-next-line consistent-return
export const validateBody = validator => (req, res, next) => {
  const invalidBody = validator(req.body);
  if (invalidBody)
    return res.status(400).send(getInvalidErrorMessages(invalidBody));
  next();
};
