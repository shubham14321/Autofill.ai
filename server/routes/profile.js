// server/routes/profile.js

const router = require('express').Router();
const User = require('../models/User'); // User model ko import karna

// --- Middleware (Yeh maan kar ki aapke paas ek auth middleware hai) ---
// Yeh har request se pehle check karega ki user logged in hai ya nahi
const authenticateUser = (req, res, next) => {
  // Yeh ek placeholder hai. Asli code mein yahan JWT token verify hoga.
  // Abhi ke liye, hum maan lete hain ki user ID request mein hai.
  // req.user = { id: "some_user_id" }; // Example
  // next();
  // Asli app mein, aap isse apne JWT verification logic se badal denge.
  // Agar aapke paas auth middleware nahi hai, to ise comment kar dein.
  console.log("Authentication middleware should be here.");
  next();
};


// --- ROUTE 1: User Ki Profile Details Get Karna ---
// GET /api/profile/me
router.get('/me', authenticateUser, async (req, res) => {
  try {
    // req.user.id auth middleware se aayega
    // Abhi ke liye, hum ek user dhoondh rahe hain
    const user = await User.findById(req.user.id).select('-password'); // Password ko chhod kar sab bhejna
    if (!user) {
      return res.status(404).json({ message: 'User nahi mila.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server mein galti ho gayi hai.', error: error.message });
  }
});


// --- ROUTE 2: User Ki Profile Update Karna ---
// PUT /api/profile/me
router.put('/me', authenticateUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body, // Jo bhi jankari frontend se aayegi, use update kar dega
      },
      { new: true } // Yeh naya, updated user wapas bhejega
    ).select('-password');

    res.status(200).json({ message: 'Profile safaltapoorvak update ho gayi!', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server mein galti ho gayi hai.', error: error.message });
  }
});


// Is router ko export karna
module.exports = router;
