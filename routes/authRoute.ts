import express from "express";

import {
  signUp,
  login,
  forgetPassword,
  verifyResetCode,
  resetPassword,
} from "../Services/authServices";
import {
  signupValidation,
  loginValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} from "../validators/authValidator";
const router = express.Router();

router.route("/signup").post(signupValidation, signUp);
router.route("/login").post(loginValidator, login);
router.route("/forgetPassword").post(forgetPasswordValidator, forgetPassword);
router.route("/verifyResetCode").post(verifyResetCode);
router.route("/resetPassword").put(resetPasswordValidator, resetPassword);

export default router;
