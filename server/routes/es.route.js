import esController from '../controllers/es.controller';

const express = require('express');
const { default: middleware } = require('../helpers/middleware');

const router = express.Router();

router.route('/reindex')
    .get(esController.pushAllPostsToEs);

export default router;