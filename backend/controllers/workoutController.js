import asyncHandler from 'express-async-handler'
import Workout from '../models/workoutModel.js'
import User from '../models/userModel.js'
import Coach from '../models/coachModel.js'

// @desc    Create new Workout
// @route   POST /api/workouts/:id/newworkout
// @access  Private
const createUserWorkout = asyncHandler(async (req, res) => {
  const {
    week,
    mondayWorkout,
    tuesdayWorkout,
    wednesdayWorkout,
    thursdayWorkout,
    fridayWorkout,
    saturdayWorkout,
    sundayWorkout,
    notes,
    cardio,
    cardioTime,
    name
  } = req.body

  const user = await User.findById(req.params.id)

  if (user) {
    const workout = await Workout.create({
      week,
      mondayWorkout,
      tuesdayWorkout,
      wednesdayWorkout,
      thursdayWorkout,
      fridayWorkout,
      saturdayWorkout,
      sundayWorkout,
      notes,
      cardio,
      cardioTime,
      user,
      name,
      coach: req.coach._id
    })
    await workout.save()
    res.status(201).json({ message: 'Workout Created' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { createUserWorkout }
