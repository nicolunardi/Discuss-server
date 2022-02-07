import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .send({ error: "No token provided for authentication." });
  }

  //   verify the token and add the payload to the request object
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.payload = payload;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default verifyJWT;
