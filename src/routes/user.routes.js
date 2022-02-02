import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("all users");
  res.send("all users");
});

router.put("/", (req, res) => {
  res.send("update user");
});

router.get("/:userId", (req, res) => {
  res.send(`get specific user of id ${req.params.userId}`);
});

export default router;
