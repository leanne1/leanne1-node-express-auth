import express from "express";
import passport from "passport";
import { attemptAsync, validateBody } from "../middleware";
import { validateAuth } from "../validate";

const router = express.Router();

router.post(
  "/login",
  validateBody(validateAuth),
  passport.authenticate("local"),
  attemptAsync(async (req, res) => {
    return res.send({
      username: req.user.username
    });
  })
);

router.get("/me", (req, res) => {
  return res.send({
    username: req.user.username
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.sendStatus(200);
});

export default router;
