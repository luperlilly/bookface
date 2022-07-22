import User from '../models/User.js'
import { createError } from "../error.js"
import bcrypt from 'bcrypt'

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
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: {followers: req.body.userId }})
        await currentUser.updateOne({ $push: {following: req.params.id }})
        res.status(200).json("User followed!")
      } else {
        return next(createError(403, 'You already follow this user'))
      }
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, 'You cannot follow yourself'))
  }
} 

export const unfollowUser = async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: {followers: req.body.userId }})
        await currentUser.updateOne({ $pull: {following: req.params.id }})
        res.status(200).json("User unfollowed")
      } else {
        return next(createError(403, 'You do not follow this user'))
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    return next(createError(403, 'You cannot unfollow yourself'))
  }
} 
