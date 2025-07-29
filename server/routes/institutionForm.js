const express = require("express");
const router = express.Router();
const InstitutionForm = require("../models/InstitutionForm");
const authenticateUser = require("../middleware/auth");

// POST /api/institution-form (upload new form)
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { formName, formCategory, pdfUrl, requiredFields } = req.body;

    const newForm = new InstitutionForm({
      uploader: req.user.id,
      formName,
      formCategory,
      pdfUrl,
      requiredFields,
    });

    await newForm.save();
    res.json({ message: "Form submitted for review", data: newForm });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload form", err });
  }
});

// GET /api/institution-form/pending (admin only)
router.get("/pending", authenticateUser, async (req, res) => {
  const forms = await InstitutionForm.find({ status: "pending" });
  res.json({ forms });
});

// PATCH /api/institution-form/approve/:id
router.patch("/approve/:id", authenticateUser, async (req, res) => {
  const form = await InstitutionForm.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
  res.json({ message: "Form approved", form });
});

module.exports = router;
