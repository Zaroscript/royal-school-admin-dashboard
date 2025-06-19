import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  createGrade, 
  getAllGrades, 
  getGradeById, 
  updateGrade, 
  deleteGrade,
  getGradesByStudent,
  getGradesByExam,
  getGradesByCourse
} from '../controllers/grade.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Grade routes
router.post('/', requireRole(['admin', 'moderator']), createGrade);
router.get('/', getAllGrades);
router.get('/student/:studentId', getGradesByStudent);
router.get('/exam/:examId', getGradesByExam);
router.get('/course/:courseId', getGradesByCourse);
router.get('/:id', getGradeById);
router.put('/:id', requireRole(['admin', 'moderator']), updateGrade);
router.delete('/:id', requireRole(['admin']), deleteGrade);

export default router; 