import express from 'express'
const router = express.Router()
import { getPrograms, getProgramById } from '../controllers/programContoller.js'

router.route('/').get(getPrograms)
router.route('/:id').get(getProgramById)

export default router
