import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Chat en vivo" });
});

export default router;