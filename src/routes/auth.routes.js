import express from "express";
import { login, register } from "../controllers/authController.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", (req, res) => {
  res.send("logout");
});

router.post("/register", register);

export default router;
