import express from 'express';
import boardRoutes from './board.route';

const router = express.Router();

router.get('/status', (req, res) =>
  res.json({
    message: 'OK',
  }),
);

router.use('/boards', boardRoutes);

export default router;
