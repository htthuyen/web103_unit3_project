import express from 'express'
import { getEvents, getEventById, getEventsByLocationId } from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/location/:locationId', getEventsByLocationId)
router.get('/:id', getEventById)

export default router