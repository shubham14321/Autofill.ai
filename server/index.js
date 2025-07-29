// server/index.js

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// ROUTES IMPORT
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const shareProfileRoutes = require("./routes/shareProfile");
const filledFormRoutes = require("./routes/filledForm");
const formSuggestionRoutes = require("./routes/formSuggestion");
const feedbackRoutes = require("./routes/feedback");
const institutionFormRoutes = require("./routes/institutionForm");

// USE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/share-profile", shareProfileRoutes);
app.use("/api/filled-form", filledFormRoutes);
app.use("/api/form-suggestions", formSuggestionRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/institution-form", institutionFormRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
