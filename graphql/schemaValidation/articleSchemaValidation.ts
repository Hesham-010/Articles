import { UserInputError } from "apollo-server";
import Joi from "joi";

export function createArticleValidation (articleData: any)
{
    const schema = Joi.object({
        title: Joi.string().min(6).max(30).required(),
        content: Joi.string().required(),
        CategoryId:Joi.string().required(),
    });
      const { value, error } = schema.validate(articleData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function updateArticleValidation (articleData: any)
{
    const schema = Joi.object({
        id: Joi.required(),
        title: Joi.string().min(6).max(30),
        content: Joi.string().required(),
        CategoryId:Joi.string(),
    });
      const { value, error } = schema.validate(articleData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}