import express from "express";
import { allUsers } from "../controllers/userController.controller.js";

const router = express.Router();

router.get("/", allUsers);

router.put("/", (req, res) => {
  res.send("update user");
});

router.get("/:userId", (req, res) => {
  res.send(`get specific user of id ${req.params.userId}`);
});

export default router;
