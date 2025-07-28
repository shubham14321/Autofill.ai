// server/shared/i18n.js

const languages = {
  en: {
    filled_by: "Filled by Autofill.ai",
    submit: "Submit",
    name: "Name",
    date: "Date",
    signature: "Signature",
    download: "Download",
    upload: "Upload",
    profile: "Profile",
    form_center: "Form Center",
    history: "Form History",
    language: "Language",
    logout: "Logout",
  },
  hi: {
    filled_by: "Autofill.ai द्वारा भरा गया",
    submit: "जमा करें",
    name: "नाम",
    date: "तारीख",
    signature: "हस्ताक्षर",
    download: "डाउनलोड करें",
    upload: "अपलोड करें",
    profile: "प्रोफ़ाइल",
    form_center: "फॉर्म केंद्र",
    history: "फॉर्म इतिहास",
    language: "भाषा",
    logout: "लॉग आउट",
  },
};

const getText = (key, lang = "en") => {
  return languages[lang]?.[key] || languages["en"][key] || key;
};

module.exports = { getText };
