import express from 'express'
const router = express.Router()
import { createUserWorkout } from '../controllers/workoutController.js'
import { protectCoach, protect } from '../middleware/authMiddleware.js'

router.route('/:id/newworkout').post(protectCoach, createUserWorkout)

export default router
