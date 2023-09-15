import { check } from "express-validator";
import validationMiddleware from "../middleWares/middleWareValidation";
import { models } from "../database/database";

export const createArticleValidator = [
  check("title")
    .notEmpty()
    .withMessage("title required")
    .isLength({ min: 6 })
    .withMessage("title Too short"),
  
  check("content")
    .notEmpty()
    .withMessage("content required"),
  validationMiddleware,
];

export const updateArticleValidator = [
  check("id").custom((val, { req }) =>
    models.Article.findByPk(val).then((article) => {
      if (!article) {
        return Promise.reject(new Error(`There is no article with id ${val}`));
      }
      if (article.UserId != req.user.id) {
        return Promise.reject(
          new Error(`Your are not allowed to perform this action`)
        );
      }
      return true;
    })
  ),
  validationMiddleware,
];
