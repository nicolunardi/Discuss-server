import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h",
  });
};

export const assertUserIsMember = (channel, userId) => {
  const members = channel.members;
  return members.find((id) => id.toString() === userId);
};
