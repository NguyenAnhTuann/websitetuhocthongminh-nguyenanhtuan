const express = require("express");
const router = express.Router();
const Visit = require("../models/Visit");

router.post("/", async (req, res) => {
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  try {
    await Visit.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
