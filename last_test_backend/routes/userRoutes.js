import express from 'express';
import { getAllUsers, getMe, updateMe, deleteUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
const router = express.Router();

router.post('/', authenticate, isAdmin, getAllUsers);
router.get('/', authenticate, isAdmin, getAllUsers);
router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateMe);
router.delete('/:id', authenticate, isAdmin, deleteUser);

export default router;

