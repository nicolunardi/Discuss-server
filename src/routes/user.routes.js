import express from "express";
import {
  allUsers,
  getUser,
  updateUser,
} from "../controllers/userController.controller.js";

const router = express.Router();

router.get("/", allUsers);

router.put("/", updateUser);

router.get("/:userId", getUser);

export default router;
