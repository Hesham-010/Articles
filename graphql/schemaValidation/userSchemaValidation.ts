import { UserInputError } from "apollo-server";
import Joi from "joi";

export function createUserValidation (userData: any)
{
    const schema = Joi.object({
        name: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15).required(),
        phone: Joi.string().length(11),
        role: Joi.string(),
        adresses: Joi.string(),
    });
      const { value, error } = schema.validate(userData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function updateUserValidation (userData: any)
{
    const schema = Joi.object({
        id: Joi.required(),
        name: Joi.string().min(6).max(20),
        email: Joi.string().email(),
        password: Joi.string().min(6).max(15),
        phone: Joi.string().length(11),
        role: Joi.string(),
        adresses: Joi.string(),
    });
      const { value, error } = schema.validate(userData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function updateLoggedUserValidation (userData: any)
{
    const schema = Joi.object({
        name: Joi.string().min(6).max(20),
        email: Joi.string().email(),
        password: Joi.string().min(6).max(15),
        phone: Joi.string().length(11),
        adresses: Joi.string(),
    });
      const { value, error } = schema.validate(userData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function changeLoggedUserPasswordValidation (password)
{
    const schema = Joi.object({
        password: Joi.string().min(6).max(15),
    });
      const { value, error } = schema.validate(password, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}
