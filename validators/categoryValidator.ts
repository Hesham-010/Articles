import { check } from "express-validator";
import validationMiddleware from "../middleWares/middleWareValidation";
import { models } from "../database/database";

export const createCategoryValidator = [
  check("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 6 })
    .withMessage("title Too short"),
  validationMiddleware,
];

export const updateCategoryValidator = [
  check("id").custom((val, { req }) =>
    models.Category.findByPk(val).then((category) => {
      if (!category) {
        return Promise.reject(new Error(`There is no article with id ${val}`));
      }
      return true;
    })
  ),
  validationMiddleware,
];
