import asyncHandler from 'express-async-handler'
import Program from '../models/programModel.js'

// @desc    Fetch all programs
// @route   GET /api/programs
// @access  Public
const getPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find({})
  res.json(programs)
})

// @desc    Fetch single program
// @route   GET /api/programs/:id
// @access  Public
const getProgramById = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id)

  if (program) {
    res.json(program)
  } else {
    res.status(404)
    throw new Error('Program not found')
  }
})

export { getPrograms, getProgramById }
