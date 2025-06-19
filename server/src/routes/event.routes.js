import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  createEvent, 
  getAllEvents, 
  getEventById, 
  updateEvent, 
  deleteEvent,
  getEventsByDate,
  getUpcomingEvents
} from '../controllers/event.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Event routes
router.post('/', requireRole(['admin', 'moderator']), createEvent);
router.get('/', getAllEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/date/:date', getEventsByDate);
router.get('/:id', getEventById);
router.put('/:id', requireRole(['admin', 'moderator']), updateEvent);
router.delete('/:id', requireRole(['admin']), deleteEvent);

export default router; 