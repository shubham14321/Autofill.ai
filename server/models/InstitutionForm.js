const mongoose = require("mongoose");

const institutionFormSchema = new mongoose.Schema({
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // business user
  formName: { type: String, required: true },
  formCategory: { type: String }, // e.g. "Bank", "School", etc.
  pdfUrl: { type: String, required: true }, // cloud/file path
  requiredFields: [{ fieldName: String, fieldType: String }], // e.g. name, dob
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InstitutionForm", institutionFormSchema);
