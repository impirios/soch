import postController from '../controllers/post.controller';
import middleware from '../helpers/middleware';
import postValidator from '../validators/post.validator';
import validate from 'express-validation';
const express = require('express');

const router = express.Router();

router.route('/')
    .post(validate(postValidator.post), middleware.checkLogin, postController.createPost)
    .put(validate(postValidator.update), middleware.checkLogin, middleware.postBelongsToUser, postController.updatePost)
    .get(validate(postValidator.getPost), postController.getPost)
    .delete(middleware.checkLogin, middleware.postBelongsToUser, postController.deletePost)

router.route('/getAllPosts')
    .get(postController.getAllPosts)

router.route('/search')
    .get(postController.searchPosts)

router.route('/searchByTags')
    .get(postController.getPostsByTags)

export default router;