const express = require("express");
const Program = require("../models/Program");
const User = require("../models/User");

const router = express.Router();

router.get("/programs", async (req, res) => {
  try {
    const programs = await Program.find();
    res.send(programs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/register/:programId", async (req, res) => {
  try {
    const program = await Program.findById(req.params.programId);
    if (!program) {
      return res.status(404).send();
    }
    program.students.push(req.user._id);
    await program.save();
    res.send(program);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
