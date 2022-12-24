import express from 'express';
import userController from '../controllers/user.controller';
import middleware from '../helpers/middleware';

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

export default router;
