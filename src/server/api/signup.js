import express from "express";
import bcrypt from "bcrypt";
import get from "lodash.get";
import { validateUser } from "../validate";
import { User } from "../model";
import { attemptAsync, validateBody } from "../middleware";

const router = express.Router();

const createUser = ({ username }, password) => {
  const newUser = new User({ username, password });
  return newUser.save();
};

const getHashedPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

router.post(
  "/",
  validateBody(validateUser),
  attemptAsync(async (req, res) => {
    const { body } = req;

    const hasUser = await User.findOne({ username: body.username });
    if (hasUser) return res.status(400).send("User already registered");

    const hashedPassword = await getHashedPassword(get(body, "password"));
    const user = await createUser(body, hashedPassword);

    return res.send({
      id: user._id, // eslint-disable-line no-underscore-dangle
      username: user.username
    });
  })
);

export default router;
