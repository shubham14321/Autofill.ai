// PATCH /api/profile/update
router.patch('/update', authenticateUser, async (req, res) => {
  try {
    const updates = req.body; // {name, phone, ..., language}
    const updatedProfile = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json({ message: 'Profile updated', data: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});
// shared/i18n.js
const languages = {
  en: {
    filled_by: "Filled by Autofill.ai",
    submit: "Submit",
    ...
  },
  hi: {
    filled_by: "Autofill.ai द्वारा भरा गया",
    submit: "जमा करें",
    ...
  },
};

const getText = (key, lang = "en") => {
  return languages[lang]?.[key] || languages.en[key];
};

module.exports = { getText };
const { getText } = require("../shared/i18n");

const footerText = getText("filled_by", user.language);
