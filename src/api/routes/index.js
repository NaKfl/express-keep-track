import express from 'express';
import boardRoutes from './board.route';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router();

router.get('/status', (req, res) =>
  res.json({
    message: 'OK',
  }),
);

router.use('/boards', boardRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
