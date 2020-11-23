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
// @access  Private
const getCoachProfile = asyncHandler(async (req, res) => {
  const coach = await Coach.findById(req.coach._id)

  if (coach) {
    res.json({
      _id: coach._id,
      name: coach.name,
      email: coach.email,
      image: coach.image,
      bio: coach.bio,
      price: coach.price,
      isAdmin: coach.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('Coach not found')
  }
})

// @desc    Update coach profile
// @route   PUT /api/coaches/profile
// @access  Private
const updateCoachProfile = asyncHandler(async (req, res) => {
  const coach = await Coach.findById(req.coach._id)

  if (coach) {
    coach.name = req.body.name || coach.name
    coach.email = req.body.email || coach.email
    coach.image = req.body.image || coach.image
    coach.bio = req.body.bio || coach.bio
    coach.price = req.body.price || coach.price
    if (req.body.password) {
      coach.password = req.body.password
    }
    const updatedCoach = await coach.save()
    res.json({
      _id: updatedCoach._id,
      name: updatedCoach.name,
      email: updatedCoach.email,
      image: updatedCoach.image,
      price: updatedCoach.price,
      isAdmin: updatedCoach.isAdmin,
      token: generateToken(updatedCoach._id)
    })
  } else {
    res.status(404)
    throw new Error('Coach not found')
  }
})

// @desc    Fetch all coaches
// @route   GET /api/coaches
// @access  Public
const getCoaches = asyncHandler(async (req, res) => {
  const coaches = await Coach.find({}).select('-password')
  res.json(coaches)
})

// // @desc    Fetch single coach
// // @route   GET /api/coaches/:id
// // @access  Public
// const getCoachById = asyncHandler(async (req, res) => {
//   const coach = await Coach.findById(req.params.id).select('-password')

//   if (coach) {
//     res.json(coach)
//   } else {
//     res.status(404)
//     throw new Error('Coach not found')
//   }
// })

export {
  authCoach,
  getCoachProfile,
  registerCoach,
  updateCoachProfile,
  getCoaches
  // getCoachById
}
