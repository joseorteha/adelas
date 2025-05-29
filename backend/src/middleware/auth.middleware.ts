import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interfaz que extiende Request para incluir el usuario autenticado
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Middleware para verificar autenticación
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Obtener token del header de autorización
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Si no hay token, denegar acceso
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Acceso denegado. No hay token de autenticación' 
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'adelas_secret_key');
    
    // Añadir usuario al request
    req.user = decoded as { id: string; email: string; role: string };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

// Middleware para verificar rol de administrador
export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Verificar si el usuario está autenticado (el middleware auth debe ejecutarse primero)
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado. Usuario no autenticado'
    });
  }

  // Verificar si el usuario es administrador
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requieren privilegios de administrador'
    });
  }

  // Si es admin, permitir acceso
  next();
}; 