import express from 'express'
const router = express.Router()
import { authCoach } from '../controllers/coachController.js'

router.post('/login', authCoach)

export default router
