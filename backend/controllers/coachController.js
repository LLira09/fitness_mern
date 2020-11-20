import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Coach from '../models/coachModel.js'

// @desc    Auth coach & get token
// @route   POST /api/coaches/login
// @access  Public
const authCoach = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const coach = await Coach.findOne({ email })

  if (coach && (await coach.matchPassword(password))) {
    res.json({
      _id: coach._id,
      name: coach.name,
      email: coach.email,
      image: coach.image,
      price: coach.price,
      isAdmin: coach.isAdmin,
      token: generateToken(coach._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

// @desc    Register Coach
// @route   POST /api/coaches
// @access  Public
const registerCoach = asyncHandler(async (req, res) => {
  const { name, email, image, bio, price, password } = req.body

  const coachExists = await Coach.findOne({ email })

  if (coachExists) {
    res.status(400)
    throw new Error('Coach already exists')
  }

  const coach = await Coach.create({
    name,
    email,
    image,
    bio,
    price,
    password
  })
  if (coach) {
    res.status(201).json({
      _id: coach._id,
      name: coach.name,
      email: coach.email,
      image: coach.image,
      bio: coach.bio,
      price: coach.price,
      isAdmin: coach.isAdmin,
      token: generateToken(coach._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid coach data')
  }
})

// @desc    Get coach profile
// @route   GET /api/coach/profile
// @access  Public
const getCoachProfile = asyncHandler(async (req, res) => {
  const coach = await Coach.findById(req.coach._id)

  if (coach) {
    res.json({
      _id: coach._id,
      name: coach.name,
      email: coach.email,
      image: coach.image,
      price: coach.price,
      isAdmin: coach.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('Coach not found')
  }
})

export { authCoach, getCoachProfile, registerCoach }
