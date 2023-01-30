import express from 'express'
import userRoutes from './user.route'
import postRoutes from './post.route'
import relationRoutes from './relation.route'
import feedRoutes from './feed.route'
import esRoutes from './es.route'
const router = express.Router();

router.use('/user', userRoutes)

router.use('/post', postRoutes)

router.use('/relation', relationRoutes)

router.use('/feed', feedRoutes)

router.use('/worker',esRoutes)

export default router;