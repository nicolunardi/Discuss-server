import mongoose from "mongoose";
import User from "../models/User.model.js";

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ error });
  }
};
