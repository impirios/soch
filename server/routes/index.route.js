import express from 'express'
import userRoutes from './user.route'
import postRoutes from './post.route'
import relationRoutes from './relation.route'
import feedRoutes from './feed.route'

const router = express.Router();

router.use('/user', userRoutes)

router.use('/post', postRoutes)

router.use('/relation', relationRoutes)

router.use('/feed', feedRoutes)

export default router;