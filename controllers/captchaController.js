const User = require("../models/UserSchema");

// Function to generate a random captcha
const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 7 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};

// Get captcha (or create a new one)
const getCaptcha = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    let user = await User.findOne({ name });
    if (user) {
      return res.json({ captcha: user.captcha });
    }

    const captcha = generateCaptcha();
    user = new User({ name, Amount: 0, captcha });
    await user.save();
    res.json({ captcha });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Verify the captcha input
const verifyCaptcha = async (req, res) => {
  try {
    const { name, inputValue } = req.body;
    if (!name || !inputValue) {
      return res.status(400).json({ message: "Name and input value are required" });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.captcha === inputValue) {
      user.Amount += 10;
      user.captcha = generateCaptcha();
      await user.save();
      return res.json({ success: true, Amount: user.Amount, captcha: user.captcha });
    } else {
      return res.status(400).json({ success: false, message: "Incorrect CAPTCHA" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getCaptcha, verifyCaptcha };
