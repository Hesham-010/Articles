import { UserInputError } from "apollo-server";
import Joi from "joi";

export function signUpValidation (singUpData: any)
{
    const schema = Joi.object({
        name: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15).required(),
        phone: Joi.string().length(11),
        role: Joi.string(),
        adresses: Joi.string(),
    });
      const { value, error } = schema.validate(singUpData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function loginValidation (loginData: any)
{
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(6).max(15),
    });
      const { value, error } = schema.validate(loginData, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function forgetPasswordValidation (email: any)
{
    const schema = Joi.object({
        email: Joi.string().email(),
    });
      const { value, error } = schema.validate(email, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}

export function resetPasswordValidation (email: any)
{
    const schema = Joi.object({
      email: Joi.string().email().required(),
      newPassword: Joi.string().min(6).required()
    });
      const { value, error } = schema.validate(email, { abortEarly: false });
      if (error) {
        throw new UserInputError("Validation Error", {
          validationErrors: error.details,
        });
    }
}