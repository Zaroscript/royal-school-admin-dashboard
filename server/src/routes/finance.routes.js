import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  createFinanceRecord, 
  getAllFinanceRecords, 
  getFinanceRecordById, 
  updateFinanceRecord, 
  deleteFinanceRecord,
  getFinanceRecordsByStudent,
  getFinanceRecordsByType,
  getFinanceSummary
} from '../controllers/finance.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Finance routes
router.post('/', requireRole(['admin', 'moderator']), createFinanceRecord);
router.get('/', getAllFinanceRecords);
router.get('/summary', getFinanceSummary);
router.get('/student/:studentId', getFinanceRecordsByStudent);
router.get('/type/:type', getFinanceRecordsByType);
router.get('/:id', getFinanceRecordById);
router.put('/:id', requireRole(['admin', 'moderator']), updateFinanceRecord);
router.delete('/:id', requireRole(['admin']), deleteFinanceRecord);

export default router; 