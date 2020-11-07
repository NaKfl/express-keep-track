import { Joi } from 'express-validation';

export const getMany = {
  query: Joi.object({
    name: Joi.string().trim().max(128),
    phone: Joi.string().trim().max(12),
    // TODO
    // email: Joi.string()
    //   .trim()
    //   .lowercase()
    //   .email({ tlds: { allow: false } }),
  }),
};

export const createOne = {
  body: Joi.object({
    name: Joi.string().trim().max(128),
    phone: Joi.string().trim().max(12),
    gender: Joi.string(),
    avatar: Joi.string().trim(),
    email: Joi.string()
      .required()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(6).max(128),
    facebook: Joi.object({
      uid: Joi.string(),
      token: Joi.string().token(),
    }),
    google: Joi.object({
      uid: Joi.string(),
      token: Joi.string().token(),
    }),
    boards: Joi.array().items(Joi.string()),
  }),
};

export const getOne = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .required(),
  }),
};

export const updateOne = {
  body: Joi.object({
    name: Joi.string().trim().max(128),
    phone: Joi.string().trim().max(12),
    gender: Joi.string(),
    avatar: Joi.string().trim(),
    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(6).max(128),
    facebook: Joi.object({
      uid: Joi.string(),
      token: Joi.string().token(),
      email: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: false } }),
    }),
    google: Joi.object({
      uid: Joi.string(),
      token: Joi.string().token(),
      email: Joi.string()
        .trim()
        .lowercase()
        .email({ tlds: { allow: false } }),
    }),
    boards: Joi.array().items(Joi.string()),
    isDeleted: Joi.boolean(),
  }),
  params: Joi.object({
    id: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .required(),
  }),
};

export const removeOne = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[a-fA-F0-9]{24}$/)
      .required(),
  }),
};
