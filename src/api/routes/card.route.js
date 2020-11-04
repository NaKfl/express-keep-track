import express from 'express';
import CardController from '../controllers/card.controller';

const router = express.Router();

router.route('/').get(CardController.getMany).post(CardController.createOne);

router
  .route('/:id')
  .get(CardController.getOne)
  .put(CardController.updateOne)
  .delete(CardController.removeOne);

export default router;
