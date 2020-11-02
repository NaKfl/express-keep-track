import { Joi } from 'express-validation';

export const getMany = {
  query: Joi.object({
    name: Joi.string().max(128),
  }),
};

export const createOne = {
  body: Joi.object({
    name: Joi.string().max(128).required(),
    columns: Joi.array().items(Joi.string()),
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
    name: Joi.string().max(128).required(),
    columns: Joi.array().items(Joi.string()),
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
