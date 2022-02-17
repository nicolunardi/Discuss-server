import express from "express";
import {
  login,
  register,
  logout,
} from "../controllers/authController.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/register", register);

export default router;
