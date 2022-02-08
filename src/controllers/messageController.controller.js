import { Channel, Message } from "../models/index.js";

export const getMessages = async (req, res) => {
  try {
    //   get the start value for messages
    const start = parseInt(req.query.start);
    const { channelId } = req.params;

    const channel = await Channel.findOne({ _id: channelId });
    if (!channel) {
      return res.status(404).json({ error: "Channel does not exist" });
    }
    // TODO rest of message logic
    return res.status(200).json({ messages: channel.messages });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const createMessage = async (req, res) => {
  try {
    //   get the user id
    const { id } = req.payload;
    const { channelId } = req.params;
    const { message, image } = req.body;
    if (!(message || image)) {
      return res.status(409).json({ error: "Must not be empty." });
    }
    // get the channel that the message is been sent to
    const channel = await Channel.findOne({ _id: channelId });
    if (!channel) {
      return res.status(404).json({ error: "Channel does not exist" });
    }

    // create the message
    const newMessage = await Message.create({
      channel: channelId,
      message,
      image,
      sender: id,
    });

    channel.messages.push(newMessage._id);
    await channel.save();

    return res.status(200).json("message sent successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
};
