import express from 'express'
const router = express.Router()
import {
  authCoach,
  registerCoach,
  getCoachProfile,
  updateCoachProfile,
  getCoaches,
  getCoachById,
  createCoachReview,
  deleteCoach
} from '../controllers/coachController.js'
import {
  protectCoach,
  protect,
  adminCoach
} from '../middleware/authMiddleware.js'

router.route('/').post(protectCoach, adminCoach, registerCoach)
router.route('/').get(getCoaches)
router.route('/:id/reviews').post(protect, createCoachReview)

router.post('/login', authCoach)
router
  .route('/profile')
  .get(protectCoach, getCoachProfile)
  .put(protectCoach, updateCoachProfile)

router.route('/coach/:id').get(getCoachById)
router.route('/:id').delete(protectCoach, adminCoach, deleteCoach)
// router.route('/').get(protectCoach, getUsers)

export default router
