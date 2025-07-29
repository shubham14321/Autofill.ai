// server/routes/shareProfile.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateUser = require("../middleware/auth");
const generateShareCode = require("../utils/generateShareCode");

// 🔁 Generate unique share code
router.post("/generate", authenticateUser, async (req, res) => {
  try {
    let newCode;
    let codeExists = true;

    while (codeExists) {
      newCode = generateShareCode();
      codeExists = await User.findOne({ shareCode: newCode });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { shareCode: newCode },
      { new: true }
    );

    res.json({ message: "Share code generated", shareCode: user.shareCode });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate share code", err });
  }
});

// 🔍 Get profile using share code
router.get("/:code", async (req, res) => {
  try {
    const user = await User.findOne({ shareCode: req.params.code }).select(
      "-password -email -shareCode"
    );

    if (!user) {
      return res.status(404).json({ error: "Invalid or expired code" });
    }

    res.json({ profile: user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shared profile", err });
  }
});

module.exports = router;
