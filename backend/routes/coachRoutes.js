import express from 'express'
const router = express.Router()
import {
  authCoach,
  registerCoach,
  getCoachProfile
} from '../controllers/coachController.js'
import { protectCoach } from '../middleware/authMiddleware.js'

router.route('/').post(registerCoach)
router.post('/login', authCoach)
router.route('/profile').get(protectCoach, getCoachProfile)

export default router
