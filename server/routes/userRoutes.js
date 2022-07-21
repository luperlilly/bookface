import express from "express"
import { deleteUser, followUser, getUser, unfollowUser, updateUser } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

// update user
router.put('/:id', verifyToken, updateUser)

// delete user
router.delete('/:id', verifyToken, deleteUser) 

// get a user
router.get('/:id', getUser)

// follow user
router.put('/:id/follow', verifyToken, followUser)

// unfollow user
router.put('/:id/unfollow', verifyToken, unfollowUser)

export default router;
