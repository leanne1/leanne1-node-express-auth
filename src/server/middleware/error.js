import winston from "winston";

// eslint-disable-next-line no-unused-vars
export const handleError = (err, req, res) => {
  winston.error(err.message, err);
  res.status(500).send(err.message);
};
