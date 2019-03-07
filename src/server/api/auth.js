import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { attemptAsync, validateBody, authenticate } from "../middleware";
import { validateAuth } from "../validate";
import { User } from "../model";

const router = express.Router();

router.post(
  "/login",
  validateBody(validateAuth),
  attemptAsync(async (req, res) => {
    const { username, password } = req.body;
    const invalidCredentialsMessage = "Invalid username or password";

    // Check user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send(invalidCredentialsMessage);

    // Check provided password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).send(invalidCredentialsMessage);

    const accessToken = jwt.sign(
      { sub: username, expiresIn: 3600000 },
      process.env.JWT_SIGNING_SECRET
    );

    return res.send({ username, accessToken });
  })
);

router.get(
  "/me",
  authenticate,
  attemptAsync((req, res) => {
    return res.send({
      username: req.user
    });
  })
);

router.get(
  "/logout",
  attemptAsync((req, res) => {
    req.user = null;
    return res.sendStatus(200);
  })
);

export default router;
