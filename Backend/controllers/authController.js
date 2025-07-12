const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// ---- SIGNUP ----
exports.signup = async (req, res) => {
      console.log("SIGNUP BODY:", req.body); // 👈 Add this
    const {
        name,
        email,
        password,
        photoURL,
        location,
        skillsOffered,
        skillsWanted,
        availability,
        isProfilePublic = true,
        role = "user"
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            photoURL,
            location,
            skillsOffered,
            skillsWanted,
            availability,
            isProfilePublic,
            role
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ token });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ---- LOGIN ----
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

//         res.status(200).json({ token });
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json({ message: "Login failed", error: err.message });
//     }
// };
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // 4. Respond with user data and token
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL,
        location: user.location,
        skillsOffered: user.skillsOffered,
        skillsWanted: user.skillsWanted,
        availability: user.availability,
        isProfilePublic: user.isProfilePublic,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
