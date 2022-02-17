import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authentication = req.headers["authorization"];
  const token = authentication && authentication.split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({ error: "No token provided for authentication." });
  }

  //   verify the token and add the payload to the request object
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.payload = payload;
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  return next();
};

export default verifyJWT;
