import express from 'express';
import { 
  getMe, 
  updateProfile, 
  changePassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus
} from '../controllers/user.controller.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - require authentication
router.use(authMiddleware);

// User profile routes
router.get('/me', getMe);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

// Admin only routes
router.get('/', adminMiddleware, getAllUsers);
router.get('/:id', adminMiddleware, getUserById);
router.put('/:id', adminMiddleware, updateUser);
router.delete('/:id', adminMiddleware, deleteUser);
router.patch('/:id/toggle-status', adminMiddleware, toggleUserStatus);

export default router; 