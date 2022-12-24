import express from 'express';
import relationController from '../controllers/relation.controller';
import middleware from '../helpers/middleware';

const router = express.Router();

router.route('/follow')
    .post(middleware.checkLogin, relationController.follow)

router.route('/unfollow')
    .post(middleware.checkLogin, relationController.unFollow)

router.route('/stats')
    .get(relationController.getFollowersAndStats)

router.route('/followers')
    .get(relationController.getFollowers)

router.route('/following')
    .get(relationController.getFollowing)

export default router;
