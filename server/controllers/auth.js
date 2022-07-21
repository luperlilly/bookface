import User from '../models/User.js'
import { createError } from "../error.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const registerUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    const user = await newUser.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT)
    const { password, ...others } = user._doc
    res.cookie('access_token', token, {
      httpOnly: true
    }).status(200).send(others)
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!user) return next(createError(404, 'User not found'))

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return next(createError(400, 'Wrong credentials'))

    const token = jwt.sign({ id: user._id }, process.env.JWT)
    const { password, ...others } = user._doc
    res.cookie('access_token', token, {
      httpOnly: true
    }).status(200).send(others) 
  } catch (error) {
    next(error)
  }
}
