import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose
    .connect(
      `mongodb://${process.env.AUTH_DB_URL}/${process.env.AUTH_DB_NAME}`,
      { useNewUrlParser: true }
    )
    .then(() =>
      // eslint-disable-next-line no-console
      console.log(
        `Connected to Database ${process.env.AUTH_DB_NAME} at ${
          process.env.AUTH_DB_URL
        }`
      )
    );
};
