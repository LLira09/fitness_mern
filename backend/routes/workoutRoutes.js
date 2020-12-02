import express from 'express'
const router = express.Router()
import {
  createUserWorkout,
  getMyWorkouts
} from '../controllers/workoutController.js'
import { protectCoach, protect } from '../middleware/authMiddleware.js'

router.route('/:id/newworkout').post(protectCoach, createUserWorkout)
router.route('/').get(protect, getMyWorkouts)

export default router
