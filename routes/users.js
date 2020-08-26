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

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(422).json({ message: "User already exits" });
      }

      user = new User({
        email,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "SECRET_KEY", { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ email: user.email, uid: user.id, token });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error!" });
    }
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
    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(422)
          .json({ message: "Invalid inputs passed, please check your data" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(422)
          .json({ message: "Invalid inputs passed, please check your data" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "SECRET_KEY", { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ email: user.email, uid: user.id, token });
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error!" });
    }
  }
);

module.exports = router;
