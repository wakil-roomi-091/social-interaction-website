const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  console.log("📝 1. Signup function called");
  console.log("📝 2. Request body:", req.body);

  try {
    const { name, email, password } = req.body;

    console.log("📝 3. Checking if user exists...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ 4. User already exists:", email);
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    console.log("📝 5. Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("📝 6. Creating user object...");
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log("📝 7. Saving user to database...");
    await user.save();

    console.log("✅ 8. User saved successfully:", user.email);
    console.log("✅ 9. User ID:", user._id);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("❌ ERROR DETAILS:", error);
    console.error("❌ Error name:", error.name);
    console.error("❌ Error message:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

const login = async (req, res) => {
  console.log("🔑 Login function called");
  console.log("🔑 Request body:", req.body);

  try {
    const { email, password } = req.body;

    console.log("🔑 Finding user...");
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("❌ User not found:", email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("🔑 Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", user.email);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login };
