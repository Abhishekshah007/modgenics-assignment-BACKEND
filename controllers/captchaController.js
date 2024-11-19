// section 1: importing models
const User = require("../models/UserSchema");

// section 2: generating random number betwwen 6 and 12 for captcha size
const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: Math.floor(Math.random() * (12 - 6 + 1)) + 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
};


// section 3: get captcha and also create a new user
const getCaptcha = async (req, res) => {
    try {
      const { fullname } = req.body;
  
      if (!fullname) {
        return res.status(400).json({ message: "Name is required" });
      }
  
      let user = await User.findOne({ fullname });
  
      if (user) {
        return res.json({ captcha: user.captcha, Amount: user.Amount });
      }
  
      const captcha = generateCaptcha();
      user = new User({ fullname, Amount: 0, captcha });
      if (!user.fullname) {
        return res.status(400).json({ message: "Invalid fullname provided" });
      }
  
      await user.save();
      res.json({ captcha });
    } catch (error) {
      console.error("Error in getCaptcha:", error); 
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  

//   section 4: verify captcha and also update the amount
const verifyCaptcha = async (req, res) => {
  try {
    const { fullname, inputValue } = req.body;
    if (!fullname || !inputValue) {
      return res.status(400).json({ message: "Name and input value are required" });
    }

    const user = await User.findOne({ fullname });
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
