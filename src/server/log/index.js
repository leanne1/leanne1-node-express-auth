import winston from "winston";

export const handleExceptions = () => {
  winston.exceptions.handle([
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "logfile.log" })
  ]);

  process.on("unhandledRejection", err => {
    // winston will handle this
    throw err;
  });
};
