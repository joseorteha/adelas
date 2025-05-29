import api from '../utils/api';

export interface Route {
  _id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  price: number;
  serviceType: 'Ordinario' | 'Rápido' | 'Directo';
  schedule: {
    departure: string;
    arrival: string;
  };
  stops: string[];
  active: boolean;
}

export const routeService = {
  // Obtener todas las rutas
  getAllRoutes: async () => {
    const response = await api.get<Route[]>('/routes');
    return response.data;
  },

  // Obtener una ruta por ID
  getRouteById: async (id: string) => {
    const response = await api.get<Route>(`/routes/${id}`);
    return response.data;
  },

  // Buscar rutas por origen y destino
  searchRoutes: async (origin: string, destination: string) => {
    const response = await api.get<Route[]>('/routes/search', {
      params: { origin, destination }
    });
    return response.data;
  },

  // Crear una nueva ruta
  createRoute: async (routeData: Omit<Route, '_id'>) => {
    const response = await api.post<Route>('/routes', routeData);
    return response.data;
  },

  // Actualizar una ruta
  updateRoute: async (id: string, routeData: Partial<Route>) => {
    const response = await api.put<Route>(`/routes/${id}`, routeData);
    return response.data;
  },

  // Eliminar una ruta
  deleteRoute: async (id: string) => {
    const response = await api.delete(`/routes/${id}`);
    return response.data;
  }
}; 