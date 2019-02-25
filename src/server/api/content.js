import express from "express";
import { authenticate } from "../middleware";

const router = express.Router();

router.get("/protected", authenticate, (req, res) => {
  return res.send({
    img:
      "https://quotesnhumor.com/wp-content/uploads/2015/08/Top-50-Funniest-Memes-Collection-meme-best.jpg"
  });
});

export default router;
