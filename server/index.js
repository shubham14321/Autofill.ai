// server/index.js

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// --- CORS Configuration ---
// Sirf aapki live frontend website ko backend se baat karne ki permission dega
const corsOptions = {
  origin: "https://shubham14321.github.io",
  optionsSuccessStatus: 200 
};

// Middlewares
app.use(cors(corsOptions)); // CORS ko naye options ke saath use karein
app.use(express.json());

// --- Connect to MongoDB ---
// Yeh bilkul sahi hai, koi badlaav ki zaroorat nahi
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// --- ROUTES ---
// Ek basic test route, yeh check karne ke liye ki server chal raha hai ya nahi
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Autofill.ai Backend! Server is running." });
});

// Baaki saare routes bilkul sahi hain
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

// --- START SERVER ---
// Yeh bilkul sahi hai, koi badlaav ki zaroorat nahi
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
