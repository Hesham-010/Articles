const User = require("../models/userModel");
const validationMiddleware = require("../middleWares/middleWareValidation");
const { check } = require("express-validator");
const { models } = require("../configDb/database");
const ApiError = require("../utils/apiError");

exports.createUserValidation = [
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

exports.updateUserValidation = [
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
  validationMiddleware,
];

exports.changeMyPasswordValidation = [
  check("currentpassword")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("passswword must be at least 6 character"),

  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("passswword must be at least 6 character")
    .custom(async (password, { req }) => {
      const user = await models.User.findByPk(req.user.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }

      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error("Incorrect Current Passsword");
      }

      if (password != req.body.passwordConfirm) {
        throw new Error("Password not equal Password Confirm");
      }

      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirm is Required"),
  validationMiddleware,
];
