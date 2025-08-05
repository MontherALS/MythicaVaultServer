const express = require("express");
const router = express.Router();

const { signup, login, refresh } = require("../controllers/authController");
const { signupRules, validate } = require("../middleware/signupValidation");

router.post("/signup", signupRules, validate, signup);

router.post("/login", login);

router.post("/refresh", refresh);
module.exports = router;
