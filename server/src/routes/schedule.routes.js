import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  createSchedule, 
  getAllSchedules, 
  getScheduleById, 
  updateSchedule, 
  deleteSchedule,
  getSchedulesByTeacher,
  getSchedulesByClass,
  getSchedulesByDay
} from '../controllers/schedule.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Schedule routes
router.post('/', requireRole(['admin', 'moderator']), createSchedule);
router.get('/', getAllSchedules);
router.get('/teacher/:teacherId', getSchedulesByTeacher);
router.get('/class/:classId', getSchedulesByClass);
router.get('/day/:day', getSchedulesByDay);
router.get('/:id', getScheduleById);
router.put('/:id', requireRole(['admin', 'moderator']), updateSchedule);
router.delete('/:id', requireRole(['admin']), deleteSchedule);

export default router; 