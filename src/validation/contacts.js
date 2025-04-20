import Joi from "joi";
import { typeContacts } from "../constants/contacts.js";

export const contactsCreateSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": "Field name is required.",
    "string.base": "Name must be a string.",
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    "any.required": "Field phone is required.",
    "string.base": "Phone must be a string.",
  }),
  email: Joi.string().email().min(3).max(20).messages({
    "string.email": "Email must be a valid email address.",
  }),
  isFavorite: Joi.boolean().messages({
    "boolean.base": "isFavorite field must be of type boolean.",
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeContacts)
    .required()
    .messages({
      "any.required": "Field contactType is required.",
      "string.base": "contactType is required",
      "any.only": "contactType must be one of the allowed types.",
    }),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    "string.base": "Name must be a string.",
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    "string.base": "Phone must be a string.",
  }),
  email: Joi.string().email().min(3).max(20).messages({
    "string.email": "Email must be a valid email address.",
  }),
  isFavorite: Joi.boolean().messages({
    "boolean.base": "isFavorite field must be of type boolean.",
  }),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...typeContacts)
    .messages({
      "string.base": "contactType is required",
      "any.only": "contactType must be one of the allowed types.",
    }),
});
