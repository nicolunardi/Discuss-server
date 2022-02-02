import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  console.log("login");
  res.send("login");
});

router.post("/logout", (req, res) => {
  res.send("logout");
});

router.post("/register", (req, res) => {
  res.send("register");
});

export default router;
