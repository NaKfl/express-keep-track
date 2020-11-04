import express from 'express';
import ColumnController from '../controllers/column.controller';

const router = express.Router();

router
  .route('/')
  .get(ColumnController.getMany)
  .post(ColumnController.createOne);

router
  .route('/:id')
  .get(ColumnController.getManyByBoardId)
  .put(ColumnController.updateOne)
  .delete(ColumnController.removeOne);

export default router;
