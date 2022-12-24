import postController from '../controllers/post.controller';
import middleware from '../helpers/middleware';

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

export default router;