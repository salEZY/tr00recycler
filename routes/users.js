const express = require("express");

const Users = require("../models/Users");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, repeatPassword } = req.body;
  try {
  } catch (error) {
    console.error(error);
    return res.statusCode(404).json({ message: "Server error!" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    console.error(error);
    return res.statusCode(404).json({ message: "Server error!" });
  }
});

module.exports = router;
