// server/routes/formSuggestion.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Form = require("../models/Form");
const InstitutionForm = require("../models/InstitutionForm");
const authenticateUser = require("../middleware/auth");

// GET /api/form-suggestions
router.get("/", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Create dynamic tag list from user profile
    const userTags = [];

    if (user.occupation) userTags.push(user.occupation.toLowerCase());
    if (user.gender) userTags.push(user.gender.toLowerCase());
    if (user.age) {
      if (user.age < 18) userTags.push("child");
      else if (user.age < 30) userTags.push("young");
      else if (user.age >= 60) userTags.push("senior");
    }
    if (user.location) userTags.push(user.location.toLowerCase());

    // Fetch matching forms from both sources
    const regularForms = await Form.find({ tags: { $in: userTags } }).limit(10);
    const institutionForms = await InstitutionForm.find({ tags: { $in: userTags }, status: "approved" }).limit(10);

    res.json({
      message: "Smart suggestions generated",
      suggestions: [...regularForms, ...institutionForms],
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get suggestions", err });
  }
});

module.exports = router;
