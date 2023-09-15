import { UserInputError } from "apollo-server";
import Joi from "joi";

export function createCategoryValidation (categoryData: any)
{
    const schema = Joi.object({
        title: Joi.string().required().min(4).max(20),
    });
      const { value, error } = schema.validate(categoryData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function updateCategoryValidation (categoryData: any)
{
    const schema = Joi.object({
        id: Joi.required(),
        title: Joi.string().required().min(4).max(20),
    });
      const { value, error } = schema.validate(categoryData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}