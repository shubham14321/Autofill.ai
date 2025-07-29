const newUser = new User({
  name,
  email,
  password: hashedPassword,
  language: req.body.language || 'en', // ADD THIS LINE
});
