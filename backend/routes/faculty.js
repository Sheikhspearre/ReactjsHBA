const express = require("express");
const Program = require("../models/Program");
const User = require("../models/User");

const router = express.Router();

router.post("/programs", async (req, res) => {
  try {
    const program = new Program({
      ...req.body,
      faculty: req.user._id,
    });
    await program.save();
    res.status(201).send(program);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/programs", async (req, res) => {
  try {
    const programs = await Program.find({ faculty: req.user._id });
    res.send(programs);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
