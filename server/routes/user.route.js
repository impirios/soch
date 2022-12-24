import express from 'express';
import userController from '../controllers/user.controller';
import middleware from '../helpers/middleware';
import userValidator from '../validators/user.validator';

const router = express.Router();

router.route('/signup')
    .post(userValidator.signup, userController.signup)

router.route('/login')
    .post(userValidator.login, userController.login)

router.route('/')
    .get(middleware.checkLogin, userController.getProfile)
    .put(middleware.checkLogin, userController.updateProfile)

router.route('/search')
    .get(userController.getUsers)

export default router;
