import express from 'express';
import {
    registerEvent, cancelRegistration, getRegistrations
} from '../controllers/registrationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
const router = express.Router();

router.post('/:id/register', authenticate, registerEvent);
router.delete('/:id/register', authenticate, cancelRegistration);
router.get('/:id/registrations', authenticate, isAdmin, getRegistrations);

export default router;
