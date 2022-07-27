import Post from '../models/Post.js'
import User from '../models/User.js'
import { createError } from "../error.js"

export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body)

  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (error) {
    next(error)
  }
} 

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json("Post updated!")
    } else {
      return next(createError(403, "You can only edit your own posts"))
    }
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.userId === req.user.id) {
      await post.deleteOne()
      res.status(200).json("Post deleted")
    } else {
      return next(createError(403, "You can only delete your own posts"))
    }
  } catch (error) {
    next(error)
  }
}

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json("Post liked!")
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json("Post unliked")
    }   
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const getTimelinePosts = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id)
    const userPosts = await Post.find({ userId: currentUser._id })
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    res.json(userPosts.concat(...friendPosts))
  } catch (error) {
    next(error)
  }
}
