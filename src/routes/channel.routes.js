import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("all channels");
});

router.post("/", (req, res) => {
  res.send("new channel");
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(`channel of id ${req.params.id}`);
});

router.put("/:id", (req, res) => {
  res.send("update channel of id", req.params.id);
});

router.post("/:id/join", (req, res) => {
  res.send("join");
});

router.post("/:id/leave", (req, res) => {
  res.send("leave");
});

router.post("/:id/invite", (req, res) => {
  res.send("invite");
});

export default router;
