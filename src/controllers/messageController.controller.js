import { Channel, Message } from "../models/index.js";

export const getMessages = async (req, res) => {
  try {
    //   number of messages to send back
    const numberOfMsgs = parseInt(req.query.number);
    // start is the index at which to get messages from
    const start = parseInt(req.query.start);
    // the last index of messages to get
    const end = start + numberOfMsgs;
    const { channelId } = req.params;

    // get the channel so that the messages can be returned
    const channel = await Channel.findOne({ _id: channelId }).populate(
      "messages"
    );
    if (!channel) {
      return res.status(404).json({ error: "Channel does not exist" });
    }

    // reverse the array as to get the newest messages first and slice
    // based on start and end
    const messages = channel.messages.reverse().slice(start, end);

    return res.status(200).json({ messages });
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
