import asyncHandler from 'express-async-handler'
import Coach from '../models/coachModel.js'

// @desc    Auth coach & get token
// @route   POST /api/coach/login
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
      token: null
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

export { authCoach }
