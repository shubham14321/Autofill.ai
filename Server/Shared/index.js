const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);
const institutionFormRoutes = require("./routes/institutionForm");
app.use("/api/institution-form", institutionFormRoutes);
const formSuggestionRoutes = require("./routes/formSuggestion");
app.use("/api/form-suggestions", formSuggestionRoutes);
