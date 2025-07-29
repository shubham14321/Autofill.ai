// server/routes/feedback.js
const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const authenticateUser = require("../middleware/auth");

// POST /api/feedback
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { formId, rating, comment } = req.body;

    const feedback = new Feedback({
      user: req.user.id,
      formId,
      rating,
      comment,
    });

    await feedback.save();
    res.json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback", err });
  }
});

module.exports = router;
