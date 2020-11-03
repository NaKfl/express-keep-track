import { Joi } from 'express-validation';

export const register = {
  body: Joi.object({
    name: Joi.string().trim().max(128),
    email: Joi.string()
      .required()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6).max(128),
  }),
};

export const login = {
  body: Joi.object({
    email: Joi.string()
      .required()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().max(128),
  }),
};
