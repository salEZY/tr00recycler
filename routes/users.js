const express = require("express");
const { check, validationResult } = require("express-validator");

const Users = require("../models/Users");

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
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data" });
    }

    const { email, password, repeatPassword } = req.body;
    try {
    } catch (error) {
      console.error(error);
      return res.statusCode(404).json({ message: "Server error!" });
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
    if (!errors.isEmpty()) {
      console.log(errors);
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data" });
    }

    const { email, password } = req.body;
    try {
    } catch (error) {
      console.error(error);
      return res.statusCode(404).json({ message: "Server error!" });
    }
  }
);

module.exports = router;
