// server/models/User.js

const mongoose = require('mongoose');

// Yeh User ka blueprint (Schema) hai
// Yeh database ko batata hai ki har user ke paas kya-kya jankari hogi
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true, // Har user ka email alag hona chahiye
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    language: {
      type: String,
      default: 'en', // Default language English set hai
    },
    // Aap yahan aur bhi cheezein jod sakte hain, jaise profile picture, etc.
  },
  { timestamps: true } // Yeh apne aap 'createdAt' aur 'updatedAt' time jod dega
);

// Is blueprint (Schema) se ek Model banana aur use export karna
// Yahi woh "User" hai jise humari doosri files dhoondh rahi hain
module.exports = mongoose.model('User', UserSchema);
