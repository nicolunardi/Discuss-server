import express from "express";
import {
  allChannels,
  createChannel,
  getChannel,
} from "../controllers/channelController.controller.js";

const router = express.Router();

router.get("/", allChannels);

router.post("/", createChannel);

router.get("/:id", getChannel);

router.put("/:id", (req, res) => {
  res.send("update channel of id", req.params.id);
});

router.post("/:id/join", (req, res) => {
  res.send("join");
});

router.post("/:id/leave", (req, res) => {
  res.send("leave");
});

router.post("/:id/invite", (req, res) => {
  res.send("invite");
});

export default router;
