import express from 'express';
import AuthController from '../controllers/auth.controller';
import { validate } from 'express-validation';
import {
  login,
  register,
  refresh,
  oAuth,
} from '../validations/auth.validation';
import { oAuth as oAuthLogin } from '../middlewares/auth';

const router = express.Router();

router.route('/register').post(validate(register), AuthController.register);

router.route('/login').post(validate(login), AuthController.login);

router.route('/refresh-token').post(validate(refresh), AuthController.refresh);

router
  .route('/google')
  .post(validate(oAuth), oAuthLogin('google'), AuthController.oAuth);

export default router;
