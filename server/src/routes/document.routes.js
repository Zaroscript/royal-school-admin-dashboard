import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  createDocument, 
  getAllDocuments, 
  getDocumentById, 
  updateDocument, 
  deleteDocument,
  getDocumentsByCategory,
  downloadDocument
} from '../controllers/document.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Document routes
router.post('/', requireRole(['admin', 'moderator']), createDocument);
router.get('/', getAllDocuments);
router.get('/category/:category', getDocumentsByCategory);
router.get('/:id', getDocumentById);
router.get('/:id/download', downloadDocument);
router.put('/:id', requireRole(['admin', 'moderator']), updateDocument);
router.delete('/:id', requireRole(['admin']), deleteDocument);

export default router; 