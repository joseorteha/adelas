import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener información del usuario actual (requiere autenticación)
router.get('/me', authMiddleware, getCurrentUser);

export default router;
