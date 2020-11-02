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

const router = express.Router();

router
  .route('/')
  .get(validate(getMany), BoardController.getMany)
  .post(validate(createOne), BoardController.createOne);

router
  .route('/:id')
  .get(validate(getOne), BoardController.getOne)
  .put(validate(updateOne), BoardController.updateOne)
  .delete(validate(removeOne), BoardController.removeOne);

export default router;
