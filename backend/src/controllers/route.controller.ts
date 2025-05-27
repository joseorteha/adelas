import { Request, Response } from 'express';
import Route, { IRoute } from '../models/route.model';

// Obtener todas las rutas
export const getRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await Route.find({ active: true });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las rutas', error });
  }
};

// Obtener una ruta por ID
export const getRouteById = async (req: Request, res: Response) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la ruta', error });
  }
};

// Crear una nueva ruta
export const createRoute = async (req: Request, res: Response) => {
  try {
    const newRoute = new Route(req.body);
    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la ruta', error });
  }
};

// Actualizar una ruta
export const updateRoute = async (req: Request, res: Response) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRoute) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.json(updatedRoute);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la ruta', error });
  }
};

// Eliminar una ruta (soft delete)
export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!route) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    res.json({ message: 'Ruta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la ruta', error });
  }
};

// Buscar rutas por origen y destino
export const searchRoutes = async (req: Request, res: Response) => {
  try {
    const { origin, destination } = req.query;
    const routes = await Route.find({
      origin: { $regex: origin, $options: 'i' },
      destination: { $regex: destination, $options: 'i' },
      active: true
    });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar rutas', error });
  }
}; 