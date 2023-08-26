const { check } = require("express-validator");
const validationMiddleware = require("../middleWares/middleWareValidation");
const { models } = require("../configDb/database");

exports.signupValidation = [
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

exports.loginValidator = [
  check("email").isEmail().notEmpty().withMessage("email required"),
  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("passswword must be at least 6 character"),
  validationMiddleware,
];

exports.forgetPasswordValidator = [
  check("email").isEmail().notEmpty().withMessage("email required"),
  validationMiddleware,
];

exports.resetPasswordValidator = [
  check("email").isEmail().notEmpty().withMessage("email required"),
  validationMiddleware,
];
