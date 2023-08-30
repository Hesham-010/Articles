import { check } from "express-validator";
import validationMiddleware from "../middleWares/middleWareValidation";
import { models } from "../configDb/database";

export const createCommentValidator = [
  check("content")
    .notEmpty()
    .withMessage("content required")
    .isLength({ min: 6 })
    .withMessage("content Too short "),
  validationMiddleware,
];

export const updateCommentValidator = [
  check("id").custom((val,{req}) => 
      models.Comment.findByPk(val).then(comment => {
          if (!comment) {
             return Promise.reject(new Error(`There is no comment with id ${val}`));
          }
          if ((comment.UserId != req.user.id)) {
             return Promise.reject(new Error(`Your are not allowed to perform this action`))
          }
          return true;
      })
  ),
  validationMiddleware,
];
