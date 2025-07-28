const mongoose = require("mongoose");

const filledFormSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  formId: { type: String }, // optional
  formName: { type: String, required: true },
  filledAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FilledForm", filledFormSchema);
