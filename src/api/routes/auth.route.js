import express from 'express';
import AuthController from '../controllers/auth.controller';
import { validate } from 'express-validation';
import { login, register } from '../validations/auth.validation';

const router = express.Router();

router.route('/register').post(validate(register), AuthController.register);

// router.route('/login').post(validate(login), AuthController.login);

export default router;
