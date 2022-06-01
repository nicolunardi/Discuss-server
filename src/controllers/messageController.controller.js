import { Message } from "../models/index.js";

export const getMessages = async (req, res) => {
  try {
    //   number of messages to send back
    const numberOfMsgs = parseInt(req.query.number);
    // start is the index at which to get messages from
    const start = parseInt(req.query.start);
    // the last index of messages to get
    const end = start + numberOfMsgs;
    const { channelId } = req.params;

    const allMessages = await Message.find({ channel: channelId });

    // reverse the array as to get the newest messages first and slice
    // based on start and end
    const messages = allMessages.reverse().slice(start, end);

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

    // create the message
    let newMessage = await Message.create({
      channel: channelId,
      message,
      image,
      sender: id,
    });

    newMessage = await newMessage.populate("sender");

    return res.status(200).json({ message: newMessage });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { message, image } = req.body;

    // ensure the message is not empty
    if (!(message || image)) {
      return res.status(400).json({ error: "Must not be empty." });
    }
    // get the message that will be edited
    const messageToUpdate = await Message.findById(messageId);

    // update the message and save
    messageToUpdate.message = message;
    messageToUpdate.image = image;
    messageToUpdate.edited = true;
    messageToUpdate.editedAt = Date.now();
    await messageToUpdate.save();

    return res.status(200).json({ message: messageToUpdate });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    // userId to verify the message belongs to the user
    const { id } = req.payload;

    // find the message
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // ensure the message belongs to the user
    if (message.sender._id.toString() !== id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this message." });
    }
    // delete the message
    await Message.deleteOne({ _id: message._id });

    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getPinnedMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const pinnedMessages = await Message.find({
      channel: channelId,
      pinned: true,
    });

    return res.status(200).json({ messages: pinnedMessages });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const pinMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }
    // update message to be pinned and save back to db
    if (!message.pinned) {
      message.pinned = true;
      await message.save();
    }

    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const unpinMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    // update message to be unpinned and save back to db
    if (message.pinned) {
      message.pinned = false;
      await message.save();
    }

    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const react = async (req, res) => {
  try {
    const { messageId } = req.params;
    // user id
    const { id } = req.payload;
    const { react } = req.body;

    if (!react) {
      return res.status(400).json({ error: "Must provide a valid reaction." });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }
    // check that the user hasn't already sent the same reaction
    if (
      message.reacts.find((r) => r.user.toString() === id && r.react === react)
    ) {
      res.status(400).json({ error: "You have already sent that reaction" });
    }

    message.reacts.push({ user: id, react });
    await message.save();

    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const unreact = async (req, res) => {
  try {
    const { messageId } = req.params;
    // user id
    const { id } = req.payload;
    const { react } = req.body;

    if (!react) {
      return res.status(400).json({ error: "Must provide a valid reaction." });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    // check that the user hasn't already sent the same reaction by getting the index
    // of the element in the array. Using this instead of find() as with teh index you can
    // access the _id of the react to then remove it using pull()
    const reactIndex = message.reacts.findIndex(
      (r) => r.user.toString() === id && r.react === react
    );
    if (reactIndex === -1) {
      return res
        .status(400)
        .json({ error: "You have not sent that reaction yet." });
    }
    message.reacts.pull({ _id: message.reacts[reactIndex] });
    await message.save();

    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
