import mongoose from "mongoose";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { createJWT } from "../utils/index.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ensure all fields are given
    if (!(email && password)) {
      return res.status(400).json({ error: "Must input all fields!" });
    }

    // check that the user exists in the database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = createJWT({ email, id: user._id });

      return res.status(200).json({ ...user.toJSON(), token });
    } else {
      return res.status(400).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ensure all fields are given
    if (!(name && email && password)) {
      return res.status(400).json({ error: "Must input all fields!" });
    }

    // check no user exists already with the given email address
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ error: "That email is in use. Please login." });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // create JWT and send token
    const token = createJWT({ email, id: newUser._id });
    // remove password and add token to object sent in response

    return res.status(200).json({ ...newUser.toJSON(), token });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({});
};
