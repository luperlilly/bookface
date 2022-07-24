import express from "express"
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from "../controllers/post.js"
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// create post
router.post('/', verifyToken, createPost)

// update post
router.put('/:id', verifyToken, updatePost)

// delete post
router.delete('/:id', verifyToken, deletePost)

// like post
router.put('/:id/like', verifyToken, likePost)

// get post
router.get('/:id', getPost)

// get timeline posts
router.get('/:id/timeline', verifyToken, getTimelinePosts)

export default router
