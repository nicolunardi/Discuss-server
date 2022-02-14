import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

/**
 * returns an array of all users
 */
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Returns a particular user based on the url parameter. Finds the user by Id
 */
export const getUser = async (req, res) => {
  try {
    // user id to be retrieved
    const userId = req.params.userId;
    const user = await User.findById(userId).lean();
    if (!user) {
      return res
        .status(404)
        .json({ error: "No user exists with that user id" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};
/**
 * Updates the current user on the database based on the new info passed in
 */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.payload;
    const { name, password, bio, image } = req.body;
    // find the user from the DB
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("That user doesn't exist.");
    }
    // update the user and save to the db
    user.name = name;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.bio = bio;
    user.image = image;

    await user.save();

    return res.status(200).json("User updated successfully.");
  } catch (error) {
    res.status(400).json({ error });
  }
};
