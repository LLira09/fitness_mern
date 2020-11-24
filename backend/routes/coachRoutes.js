import express from 'express'
const router = express.Router()
import {
  authCoach,
  registerCoach,
  getCoachProfile,
  updateCoachProfile,
  getCoaches,
  getCoachById
} from '../controllers/coachController.js'
import { protectCoach } from '../middleware/authMiddleware.js'

router.route('/').post(registerCoach)
router.route('/').get(getCoaches)

router.post('/login', authCoach)
router
  .route('/profile')
  .get(protectCoach, getCoachProfile)
  .put(protectCoach, updateCoachProfile)

router.route('/coach/:id').get(getCoachById)

export default router
