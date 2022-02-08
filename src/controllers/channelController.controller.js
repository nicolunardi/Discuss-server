import { Channel, User } from "../models/index.js";

export const allChannels = async (req, res) => {
  try {
    const { id } = req.payload;
    // return only channels that are public or the user is a member of
    const channels = await Channel.find({
      $or: [{ private: false }, { members: [id] }],
    });
    return res.status(200).json({ channels });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const createChannel = async (req, res) => {
  try {
    const { name, private: priv, description } = req.body;
    const { email } = req.payload;

    if (!name) {
      return res.status(400).json({ error: "Channel must have a name." });
    }

    const creator = await User.findOne({ email });
    if (!creator) {
      return res.status(403).json({ error: "User can't create channels" });
    }
    const newChannel = await Channel.create({
      name,
      private: priv,
      description,
      creator: creator._id,
      members: [creator._id],
    });
    return res.status(200).json({ channelId: newChannel._id });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getChannel = async (req, res) => {
  try {
    const channelId = req.params.id;
    const channel = await Channel.findOne({ _id: channelId });
    if (!channel) {
      return res
        .status(404)
        .json({ error: "Could not find channel with that id." });
    }

    return res.status(200).json(channel);
  } catch (error) {}
};
