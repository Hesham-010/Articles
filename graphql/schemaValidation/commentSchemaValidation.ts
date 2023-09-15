import { UserInputError } from "apollo-server";
import Joi from "joi";

export function createCommentValidation (commentData: any)
{
    const schema = Joi.object({
        content: Joi.string().required(),
        ArticleId:Joi.string().required(),
    });
      const { value, error } = schema.validate(commentData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function updateCommentValidation (commentData: any)
{
    const schema = Joi.object({
        id: Joi.required(),
        content: Joi.string().required(),
        ArticleId:Joi.string().required(),
    });
      const { value, error } = schema.validate(commentData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}