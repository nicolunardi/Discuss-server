import { Channel, User } from "../models/index.js";
import { assertUserIsMember } from "../utils/index.js";

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
    return res.status(400).json({ error });
  }
};

export const getChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findOne({ _id: channelId });
    if (!channel) {
      return res
        .status(404)
        .json({ error: "Could not find channel with that id." });
    }

    return res.status(200).json(channel);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    // user id
    const { id } = req.payload;
    const { name, description } = req.body;

    // name must not be empty
    if (!name) {
      return res.status(400).json({ error: "Name must not be empty" });
    }

    // find channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found." });
    }
    // user must be the creator to edit the channel info
    if (channel.creator.toString() !== id) {
      return res
        .status(403)
        .json({ error: "Not authorized to change channel info." });
    }

    channel.name = name;
    channel.description = description;
    await channel.save();

    return res.status(200).json({ channel });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const joinChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    // user id
    const { id } = req.payload;

    // get channel
    const channel = await Channel.findById(channelId);
    // check if public else user can't join, must be invited
    if (channel.private) {
      return res
        .status(403)
        .json({ error: "Not authorized to join this channel." });
    }

    // add user to member array
    channel.members.push(id);
    await channel.save();

    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const leaveChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    // user id
    const { id } = req.payload;

    // get channel
    const channel = await Channel.findById(channelId);
    // check if the user is a member
    if (!assertUserIsMember(channel, id)) {
      return res
        .status(403)
        .json({ error: "You are not a member of this channel." });
    }

    // if the user is the owner they can't leave the channel
    if (channel.creator.toString() === id) {
      return res
        .status(403)
        .json({ error: "You can't leave a channel you have created." });
    }
    // remove user from members array
    channel.members.pull(id);
    await channel.save();

    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const invite = async (req, res) => {
  try {
    const { channelId } = req.params;
    // user doing the inviting
    const { id } = req.payload;
    // user to invite
    const { userId } = req.body;

    // check that the user to be invited exists
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Can't invite a user that doesn't exist." });
    }
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: "Channel does not exist." });
    }

    // check that the user is a member. Can't invite another user if not already a member
    if (!assertUserIsMember(channel, id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to add members to this channel." });
    }

    // check the user to be invited is not already a member
    if (assertUserIsMember(channel, userId)) {
      return res
        .status(403)
        .json({ error: "That user is already a member of this channel." });
    }
    // add the user to the channel
    channel.members.push(userId);
    await channel.save();

    return res.status(200).json({ userId });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
