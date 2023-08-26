const express = require("express");

const {
  signUp,
  login,
  forgetPassword,
  verifyResetCode,
  resetPassword,
} = require("../Services/authServices");
const {
  signupValidation,
  loginValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} = require("../validators/authValidator");
const router = express.Router();

router.route("/signup").post(signupValidation, signUp);
router.route("/login").post(loginValidator, login);
router.route("/forgetPassword").post(forgetPasswordValidator, forgetPassword);
router.route("/verifyResetCode").post(verifyResetCode);
router.route("/resetPassword").put(resetPasswordValidator, resetPassword);

module.exports = router;
