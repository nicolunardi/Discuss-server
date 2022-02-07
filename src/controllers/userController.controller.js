import mongoose from "mongoose";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

/**
 * returns an array of all users
 */
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ error });
  }
};

/**
 * Returns a particular user based on the url parameter. Finds the user by Id
 */
export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .send({ error: "No user exists with that user id" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error });
  }
};
/**
 * Updates the current user on the database based on the new info passed in
 */
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, bio, image } = req.body;
    // find the user from the DB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("That user doesn't exist.");
    }
    // update the user and save to the db
    user.name = name;
    user.password = await bcrypt.hash(password, 10);
    user.bio = bio;
    user.image = image;

    await user.save();

    return res.status(200).send("User updated successfully.");
  } catch (error) {
    res.status(400).send({ error });
  }
};
