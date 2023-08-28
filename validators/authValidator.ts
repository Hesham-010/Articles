import { check } from "express-validator";
import validationMiddleware from "../middleWares/middleWareValidation";
import models from "../configDb/database";

export const signupValidation = [
  check("name")
    .notEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .isLength({ max: 32 })
    .withMessage("Too long User name"),

  check("email")
    .isEmail()
    .notEmpty()
    .withMessage("email required")
    .custom((val) =>
      models.User.findOne({ where: { email: val } }).then((user) => {
        if (user) {
          return Promise.reject(new Error("This email exist"));
        }
      })
    ),

  check("phone")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted Egy or SA phone numbers")
    .optional(),

  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("passswword must be at least 6 character")
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirm) {
        throw new Error("Password Confirm is incorrect");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirm is Required"),
  validationMiddleware,
];

export const loginValidator = [
  check("email").isEmail().notEmpty().withMessage("email required"),
  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("passswword must be at least 6 character"),
  validationMiddleware,
];

export const forgetPasswordValidator = [
  check("email").isEmail().notEmpty().withMessage("email required"),
  validationMiddleware,
];

export const resetPasswordValidator = [
  check("email").isEmail().notEmpty().withMessage("email required"),
  validationMiddleware,
];
