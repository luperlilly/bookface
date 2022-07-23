import User from '../models/User.js'
import { createError } from "../error.js"
import bcrypt from 'bcrypt'
import { getCurrentUser } from '../auth.js'

export const updateUser = async (req, res, next) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {
    // if user tries to update password, generate a new one
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        next(error)
      }
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, "You can update only your account!"))
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json('Account deleted')
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, 'You can only delete your own account'))
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, updatedAt, ...others } = user._doc // remove password & 'updated at' from returned user data
    res.status(200).json(others)
  } catch (error) {
    next(error)
  }
}

export const followUser = async (req, res, next) => {
  const currentUser = await getCurrentUser(req)
  const userToFollow = await User.findById(req.params.id);

  if (!userToFollow) {
    return next(createError(400, 'No user could be found with this ID'))
  }

  const currentUserId = currentUser._id.toString();
  const userToFollowId = userToFollow._id.toString();

  if (currentUserId === userToFollowId) {
    return next(createError(403, 'You cannot follow yourself'))
  }

  if (userToFollow.followers.includes(currentUserId)) {
    await currentUser.updateOne({ $push: { following: userToFollowId }})

    return next(createError(400, 'You already follow this user'))
  }

  try {
    await userToFollow.updateOne({ $push: { followers: currentUserId }})
    await currentUser.updateOne({ $push: { following: userToFollowId }})
    res.status(200).json("User followed!")
  } catch (error) {
    next(error)
  }
}

export const unfollowUser = async (req, res, next) => {
  const currentUser = await getCurrentUser(req)
  const userToUnfollow = await User.findById(req.params.id);

  if (!userToUnfollow) {
    return next(createError(400, 'No user could be found with this ID'))
  }

  const currentUserId = currentUser._id.toString();
  const userToUnfollowId = userToUnfollow._id.toString();

  if (currentUserId === userToUnfollowId) {
    return next(createError(403, 'You cannot unfollow yourself'))
  }

  if (!userToUnfollow.followers.includes(currentUserId)) {
    await currentUser.updateOne({ $pull: { following: userToUnfollowId }})

    return next(createError(400, 'You do not follow this user'))
  }

  try {
    await userToUnfollow.updateOne({ $pull: { followers: currentUserId }})
    await currentUser.updateOne({ $pull: { following: userToUnfollowId }})
    res.status(200).json("User unfollowed!")
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().limit(20)
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}