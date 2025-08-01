// server/models/User.js

const mongoose = require('mongoose');

// Yeh User ka poora aur sahi blueprint (Schema) hai
const UserSchema = new mongoose.Schema(
  {
    // Zaroori jankari
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Har user ka email alag hona chahiye
    },
    password: {
      type: String,
      required: true,
    },

    // Aapke dwara di gayi extra jankari
    age: { 
      type: Number 
    },
    gender: { 
      type: String, 
      enum: ["male", "female", "other"] 
    },
    occupation: { 
      type: String 
    },
    location: { 
      type: String 
    },
    language: {
      type: String,
      enum: ['en', 'hi'],
      default: 'en',
    },
    shareCode: {
      type: String,
      unique: true,
      sparse: true, // Isse null values duplicate nahi maani jaayengi
    },
  },
  { timestamps: true } // Yeh apne aap 'createdAt' aur 'updatedAt' time jod dega
);

// Is blueprint (Schema) se ek Model banana aur use export karna
// Yahi woh "User" hai jise humari doosri files dhoondh rahi hain
module.exports = mongoose.model('User', UserSchema);
