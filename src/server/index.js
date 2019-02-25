import path from "path";
import fs from "fs";
import https from "https";
import express from "express";
import { config } from "dotenv";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import passport from "passport";
import session from "express-session";
import ConnectRedis from "connect-redis";
import { handleError } from "./middleware";
import { connectToDb } from "./db";
import { handleExceptions } from "./log";
import { useApi } from "./api";
import "./middleware/login";

handleExceptions();
config();
connectToDb();

const port = process.env.PORT;
const isDev = process.env.NODE_ENV !== "production";
const key = fs.readFileSync("dev.key", "utf8");
const cert = fs.readFileSync("dev.crt", "utf8");
const app = express();
const httpsServer = https.createServer({ key, cert }, app);
const RedisStore = ConnectRedis(session); // eslint-disable-line no-unused-vars

const clientDirPath = isDev
  ? path.join(__dirname, "../../", "dist/client")
  : path.join(__dirname, "..", "client");

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("tiny"));
// Sessions and passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

useApi(app);
app.use(handleError);

// Serve static files
if (isDev) {
  // For webpack HMR
  const webpackConfig = require("../../webpack.config.js");
  const history = require("connect-history-api-fallback");
  const compiler = webpack(webpackConfig);
  app.use(history()); // Allow webpack dev app to pass-through React-router routes
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
} else {
  app.use("/", express.static(clientDirPath));
  app.use("/dist", express.static(clientDirPath));
}

const gracefullyExit = () => {
  app.close(() => {
    console.log("Process terminated"); // eslint-disable-line no-console
  });
};

process.on("uncaughtException", gracefullyExit);

// Run app
httpsServer.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log(`Listening on https://localhost:${port}...`); // eslint-disable-line no-console
});
