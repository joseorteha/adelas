import { Router } from 'express';
import {
  getRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  searchRoutes
} from '../controllers/route.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/', getRoutes);
router.get('/search', searchRoutes);
router.get('/:id', getRouteById);

// Rutas protegidas (requieren autenticación)
router.post('/', authMiddleware, createRoute);
router.put('/:id', authMiddleware, updateRoute);
router.delete('/:id', authMiddleware, deleteRoute);

export default router; 