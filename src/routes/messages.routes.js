import express from "express";
import {
  getMessages,
  createMessage,
  getPinnedMessages,
  pinMessage,
  unpinMessage,
  deleteMessage,
  editMessage,
} from "../controllers/messageController.controller.js";

const router = express.Router();

// done
router.get("/:channelId", getMessages);

// done
router.post("/:channelId", createMessage);

// done
router.put("/:channelId/:messageId", editMessage);
// done
router.delete("/:channelId/:messageId", deleteMessage);
// done
router.get("/pin/:channelId", getPinnedMessages);
// done
router.post("/pin/:channelId/:messageId", pinMessage);
// done
router.post("/unpin/:channelId/:messageId", unpinMessage);

router.post("/react/:channelId/:messageId", (req, res) => {
  res.send("react to message of channel");
});

export default router;
