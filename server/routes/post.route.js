import postController from '../controllers/post.controller';
import middleware from '../helpers/middleware';
import postValidator from '../validators/post.validator';
import validate from 'express-validation';
const express = require('express');

const router = express.Router();

router.route('/')
    .post(middleware.checkLogin, postController.createPost)
    .put(middleware.checkLogin, middleware.postBelongsToUser, postController.updatePost)
    .get(postController.getPost)
    .delete(middleware.checkLogin, middleware.postBelongsToUser, postController.deletePost)

router.route('/getAllPosts')
    .get(postController.getAllPosts)

router.route('/search')
    .get(postController.searchPosts)

router.route('/searchByTags')
    .get(postController.getPostsByTags)

router.route('/searchById')
    .get(postController.getById)

export default router;