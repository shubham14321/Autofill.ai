// Add language field
const userSchema = new mongoose.Schema({
  ...
  language: {
    type: String,
    enum: ['en', 'hi'], // Add more as needed
    default: 'en'
  },
  ...
});
occupation: { type: String },
age: { type: Number },
gender: { type: String, enum: ["male", "female", "other"] },
location: { type: String }, // e.g., country or state
shareCode: { type: String, unique: true, sparse: true },
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
  occupation: String,
  location: String,
  language: { type: String, default: "en" },
  shareCode: { type: String, unique: true, sparse: true }, // ✅ NEW
});
