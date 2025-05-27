import api from '../utils/api';
import { Location } from '../types';

export const locationService = {
  // Obtener todas las ubicaciones
  getAllLocations: async () => {
    const response = await api.get<Location[]>('/locations');
    return response.data;
  },

  // Obtener una ubicación por ID
  getLocationById: async (id: string) => {
    const response = await api.get<Location>(`/locations/${id}`);
    return response.data;
  },

  // Crear una nueva ubicación
  createLocation: async (locationData: Omit<Location, '_id'>) => {
    const response = await api.post<Location>('/locations', locationData);
    return response.data;
  },

  // Actualizar una ubicación
  updateLocation: async (id: string, locationData: Partial<Location>) => {
    const response = await api.put<Location>(`/locations/${id}`, locationData);
    return response.data;
  },

  // Eliminar una ubicación
  deleteLocation: async (id: string) => {
    const response = await api.delete(`/locations/${id}`);
    return response.data;
  }
};
