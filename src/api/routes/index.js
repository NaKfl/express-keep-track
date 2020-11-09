import express from 'express';
import boardRoutes from './board.route';
import columnRoutes from './column.route';
import cardRoutes from './card.route';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router();

router.get('/status', (req, res) => res.json({
  message: 'OK',
}));

router.use('/boards', boardRoutes);
router.use('/columns', columnRoutes);
router.use('/cards', cardRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
