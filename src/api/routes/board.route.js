import express from 'express';
import BoardController from '../controllers/board.controller';

const router = express.Router();

router.route('/').get(BoardController.getMany).post(BoardController.createOne);

router
  .route('/:id')
  .get(BoardController.getOne)
  .put(BoardController.updateOne)
  .delete(BoardController.removeOne);

export default router;
