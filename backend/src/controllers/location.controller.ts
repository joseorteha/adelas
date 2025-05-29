import { Request, Response } from 'express';
import Location from '../models/location.model';

// Obtener todas las ubicaciones
export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find({ active: true }).sort({ name: 1 });
    return res.status(200).json(locations);
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    return res.status(500).json({ message: 'Error al obtener ubicaciones' });
  }
};

// Obtener una ubicación por ID
export const getLocationById = async (req: Request, res: Response) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    return res.status(200).json(location);
  } catch (error) {
    console.error('Error al obtener ubicación:', error);
    return res.status(500).json({ message: 'Error al obtener ubicación' });
  }
};

// Crear una nueva ubicación
export const createLocation = async (req: Request, res: Response) => {
  try {
    const { name, state, type } = req.body;
    
    const existingLocation = await Location.findOne({ name });
    if (existingLocation) {
      return res.status(400).json({ message: 'Ya existe una ubicación con ese nombre' });
    }
    
    const newLocation = new Location({
      name,
      state,
      type
    });
    
    const savedLocation = await newLocation.save();
    return res.status(201).json(savedLocation);
  } catch (error) {
    console.error('Error al crear ubicación:', error);
    return res.status(500).json({ message: 'Error al crear ubicación' });
  }
};

// Actualizar una ubicación
export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { name, state, type, active } = req.body;
    
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    
    // Si se está cambiando el nombre, verificar que no exista otra ubicación con ese nombre
    if (name && name !== location.name) {
      const existingLocation = await Location.findOne({ name });
      if (existingLocation) {
        return res.status(400).json({ message: 'Ya existe una ubicación con ese nombre' });
      }
    }
    
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { name, state, type, active },
      { new: true, runValidators: true }
    );
    
    return res.status(200).json(updatedLocation);
  } catch (error) {
    console.error('Error al actualizar ubicación:', error);
    return res.status(500).json({ message: 'Error al actualizar ubicación' });
  }
};

// Eliminar una ubicación (borrado lógico)
export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    
    // Desactivar en lugar de eliminar físicamente
    const deletedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    
    return res.status(200).json({ message: 'Ubicación eliminada correctamente', location: deletedLocation });
  } catch (error) {
    console.error('Error al eliminar ubicación:', error);
    return res.status(500).json({ message: 'Error al eliminar ubicación' });
  }
};
