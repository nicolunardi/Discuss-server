import express from "express";
import {
  allChannels,
  createChannel,
  getChannel,
  invite,
  joinChannel,
  leaveChannel,
  updateChannel,
} from "../controllers/channelController.controller.js";

const router = express.Router();

router.get("/", allChannels);

router.post("/", createChannel);

router.get("/:channelId", getChannel);

router.put("/:channelId", updateChannel);

router.post("/:channelId/join", joinChannel);

router.post("/:channelId/leave", leaveChannel);

router.post("/:channelId/invite", invite);

export default router;
