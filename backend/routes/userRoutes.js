import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser
} from '../controllers/userController.js'
import {
  protect,
  protectCoach,
  adminCoach
} from '../middleware/authMiddleware.js'

router
  .route('/')
  .post(registerUser)
  .get(protectCoach, adminCoach, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/:id').delete(protectCoach, adminCoach, deleteUser)

export default router
