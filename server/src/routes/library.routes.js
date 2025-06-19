import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.middleware.js';
import { 
  createLibraryResource, 
  getAllLibraryResources, 
  getLibraryResourceById, 
  updateLibraryResource, 
  deleteLibraryResource,
  getLibraryResourcesByCategory,
  searchLibraryResources
} from '../controllers/library.controller.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Library routes
router.post('/', requireRole(['admin', 'moderator']), createLibraryResource);
router.get('/', getAllLibraryResources);
router.get('/search', searchLibraryResources);
router.get('/category/:category', getLibraryResourcesByCategory);
router.get('/:id', getLibraryResourceById);
router.put('/:id', requireRole(['admin', 'moderator']), updateLibraryResource);
router.delete('/:id', requireRole(['admin']), deleteLibraryResource);

export default router; 