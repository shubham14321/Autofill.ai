// server/routes/auth.js

const router = require('express').Router();
const User = require('../models/User'); // Sabse zaroori line, User model ko import karna
const bcrypt = require('bcryptjs'); // Password ko encrypt karne ke liye
const jwt = require('jsonwebtoken'); // Secure token banane ke liye

// --- ROUTE 1: Naya User Register Karna (/api/auth/register) ---
router.post('/register', async (req, res) => {
  try {
    // Check karein ki kya user pehle se registered hai
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: 'Is email se user pehle se hi registered hai.' });
    }

    // Password ko hash (encrypt) karna
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Naya user banana
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      language: req.body.language || 'en', // Aapke dwara diya gaya badlaav
    });

    // Naye user ko database mein save karna
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User safaltapoorvak register ho gaya!', userId: savedUser._id });

  } catch (error) {
    res.status(500).json({ message: 'Server mein koi galti ho gayi hai.', error: error.message });
  }
});


// --- ROUTE 2: User Ko Login Karna (/api/auth/login) ---
router.post('/login', async (req, res) => {
  try {
    // Check karein ki user database mein hai ya nahi
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Email ya password galat hai.' });
    }

    // Password check karna
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email ya password galat hai.' });
    }

    // Login safal hone par ek Token banana
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET || 'my-default-secret-key-for-testing', // Ek secret key
      { expiresIn: '1d' } // Token 1 din tak valid rahega
    );

    // Password ko chhod kar baaki user details wapas bhejna
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });

  } catch (error) {
    res.status(500).json({ message: 'Server mein koi galti ho gayi hai.', error: error.message });
  }
});


// Is router ko export karna taaki index.js iska istemal kar sake
module.exports = router;
