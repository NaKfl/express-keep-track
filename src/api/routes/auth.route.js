import express from 'express';
import AuthController from '../controllers/auth.controller';
import { validate } from 'express-validation';
import { login, register, refresh } from '../validations/auth.validation';

const router = express.Router();

router.route('/register').post(validate(register), AuthController.register);

router.route('/login').post(validate(login), AuthController.login);

router.route('/refresh-token').post(validate(refresh), AuthController.refresh);

export default router;
