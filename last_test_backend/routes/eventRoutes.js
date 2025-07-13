import express from 'express';
import {
    createEvent, getAllEvents, getEventById,
    updateEvent, deleteEvent, lockEvent, unlockEvent
} from '../controllers/eventController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
const router = express.Router();

router.post('/', authenticate, isAdmin, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', authenticate, isAdmin, updateEvent);
router.delete('/:id', authenticate, isAdmin, deleteEvent);
router.patch('/:id/lock', authenticate, isAdmin, lockEvent);
router.patch('/:id/unlock', authenticate, isAdmin, unlockEvent);

export default router;
