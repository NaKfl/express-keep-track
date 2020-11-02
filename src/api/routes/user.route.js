import express from 'express';
import UserController from '../controllers/user.controller';
import { validate } from 'express-validation';
import {
  getMany,
  createOne,
  getOne,
  updateOne,
  removeOne,
} from '../validations/user.validation';

const router = express.Router();

router
  .route('/')
  .get(validate(getMany), UserController.getMany)
  .post(validate(createOne), UserController.createOne);

router
  .route('/:id')
  .get(validate(getOne), UserController.getOne)
  .put(validate(updateOne), UserController.updateOne)
  .delete(validate(removeOne), UserController.removeOne);

export default router;
