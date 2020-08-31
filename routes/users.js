const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

router.post(
  "/register",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("repeatPassword").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data" });

    const { email, password, repeatPassword } = req.body;

    if (password !== repeatPassword)
      return res.status(422).json({ message: "Passwords do NOT match!" });
    let user;
    try {
      // Check if user exists
      user = await User.findOne({ email });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error!" });
    }
    if (user) {
      return res.status(422).json({ message: "User already exits" });
    }

    user = new User({
      email,
      password,
    });
    try {
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
    } catch (error) {
      return res.status(500).json({ message: "Server error!" });
    }

    // JWT

    let token;
    try {
      token = jwt.sign({ userId: user.id, email: user.email }, "SECRET_KEY", {
        expiresIn: "1h",
      });
    } catch (error) {
      return res.status(500).json({ message: "Token Server error!" });
    }

    res.json({
      user: { email: user.email, uid: user.id, created: user.createdAt },
      token,
    });
  }
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data" });

    const { email, password } = req.body;
    let user;
    try {
      // Check if user exists
      user = await User.findOne({ email });
    } catch (error) {
      return res.status(404).json({ message: "Could not find the user!" });
    }

    if (!user) {
      return res.status(422).json({ message: "User does NOT exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(422).json({ message: "Invalid password. Try again?" });
    }

    let token;
    try {
      token = jwt.sign({ userId: user.id, email: user.email }, "SECRET_KEY", {
        expiresIn: "1h",
      });
    } catch (error) {
      return res.status(500).json({ message: "Token Server error!" });
    }
    res.json({
      user: { email: user.email, uid: user.id, created: user.createdAt },
      token,
    });
  }
);

module.exports = router;
