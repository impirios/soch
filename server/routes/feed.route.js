const express = require('express');
const { default: feedController } = require('../controllers/feed.controller');
const { default: middleware } = require('../helpers/middleware');

const router = express.Router();

router.route('/')
    .get(middleware.checkLogin, feedController.getFeed);

export default router;