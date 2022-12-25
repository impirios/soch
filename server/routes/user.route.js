import express from 'express';
import userController from '../controllers/user.controller';
import middleware from '../helpers/middleware';
import userValidator from '../validators/user.validator';
import validate from 'express-validation';

const router = express.Router();

router.route('/signup')
    .post(userController.signup)

router.route('/login')
    .post(userController.login)

router.route('/')
    .get(middleware.checkLogin, userController.getProfile)
    .put(middleware.checkLogin, userController.updateProfile)

router.route('/search')
    .get(userController.getUsers)

router.route('/all')
    .get(middleware.checkLogin, userController.getAllUsers)

export default router;
