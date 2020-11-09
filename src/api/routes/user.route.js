import express from 'express';
import { validate } from 'express-validation';
import UserController from '../controllers/user.controller';
import {
  getMany,
  createOne,
  getOne,
  updateOne,
  removeOne,
} from '../validations/user.validation';
import { authorize } from '../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(authorize(), validate(getMany), UserController.getMany)
  .post(validate(createOne), UserController.createOne);

router
  .route('/:id')
  .get(authorize(), validate(getOne), UserController.getOne)
  .put(authorize(), validate(updateOne), UserController.updateOne)
  .delete(validate(removeOne), UserController.removeOne);

export default router;
