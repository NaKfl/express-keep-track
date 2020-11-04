import express from 'express';
import BoardController from '../controllers/board.controller';
import { validate } from 'express-validation';
import {
  getMany,
  createOne,
  getOne,
  updateOne,
  removeOne,
} from '../validations/board.validation';
import { authorize } from '../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(authorize(), validate(getMany), BoardController.getMany)
  .post(authorize(), validate(createOne), BoardController.createOne);

router
  .route('/:id')
  .get(validate(getOne), BoardController.getOne)
  .put(authorize(), validate(updateOne), BoardController.updateOne)
  .delete(authorize(), validate(removeOne), BoardController.removeOne);

export default router;
