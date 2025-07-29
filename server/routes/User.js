router.get('/lang', authenticateUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ language: user.language });
});
