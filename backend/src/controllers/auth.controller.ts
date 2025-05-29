import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// Controlador para el registro de usuarios
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico ya está registrado'
      });
    }

    // Crear nuevo usuario
    const user = new User({
      name,
      email,
      password,
      role: role || 'user' // Por defecto es usuario normal
    });

    // Guardar usuario en la base de datos
    await user.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'adelas_secret_key',
      { expiresIn: '24h' }
    );

    // Responder con éxito
    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// Controlador para el inicio de sesión
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'adelas_secret_key',
      { expiresIn: '24h' }
    );

    // Responder con éxito
    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

// Controlador para obtener información del usuario actual
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - req.user se añade en el middleware de autenticación
    const userId = req.user.id;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Error al obtener usuario actual:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario actual',
      error: error.message
    });
  }
};
