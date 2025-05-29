import React, { useState, useEffect } from 'react';
import { routeService, Route } from '../../services/routeService';
import { locationService } from '../../services/locationService';
import { Location } from '../../types';

const AdminRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el formulario de ruta
  const [newRoute, setNewRoute] = useState<Omit<Route, '_id'>>({
    origin: '',
    destination: '',
    distance: 0,
    duration: 0,
    price: 0,
    schedule: {
      departure: '',
      arrival: ''
    },
    serviceType: 'Ordinario',
    stops: [],
    active: true
  });
  
  // Estado para la edición
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Route, '_id'>>({
    origin: '',
    destination: '',
    distance: 0,
    duration: 0,
    price: 0,
    schedule: {
      departure: '',
      arrival: ''
    },
    serviceType: 'Ordinario',
    stops: [],
    active: true
  });
  
  // Estado para paradas
  const [stopInput, setStopInput] = useState('');
  const [editStopInput, setEditStopInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [routesData, locationsData] = await Promise.all([
        routeService.getAllRoutes(),
        locationService.getAllLocations()
      ]);
      
      setRoutes(routesData);
      setLocations(locationsData);
      setError(null);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'departure' || name === 'arrival') {
      setNewRoute({
        ...newRoute,
        schedule: {
          ...newRoute.schedule,
          [name]: value
        }
      });
    } else {
      setNewRoute({ 
        ...newRoute, 
        [name]: name === 'distance' || name === 'duration' || name === 'price' 
          ? parseFloat(value) 
          : value 
      });
    }
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'departure' || name === 'arrival') {
      setEditFormData({
        ...editFormData,
        schedule: {
          ...editFormData.schedule,
          [name]: value
        }
      });
    } else {
      setEditFormData({ 
        ...editFormData, 
        [name]: name === 'distance' || name === 'duration' || name === 'price' 
          ? parseFloat(value) 
          : value 
      });
    }
  };

  const handleAddStop = () => {
    if (stopInput.trim()) {
      setNewRoute({
        ...newRoute,
        stops: [...newRoute.stops, stopInput.trim()]
      });
      setStopInput('');
    }
  };

  const handleRemoveStop = (index: number) => {
    const updatedStops = [...newRoute.stops];
    updatedStops.splice(index, 1);
    setNewRoute({
      ...newRoute,
      stops: updatedStops
    });
  };

  const handleEditAddStop = () => {
    if (editStopInput.trim()) {
      setEditFormData({
        ...editFormData,
        stops: [...editFormData.stops, editStopInput.trim()]
      });
      setEditStopInput('');
    }
  };

  const handleEditRemoveStop = (index: number) => {
    const updatedStops = [...editFormData.stops];
    updatedStops.splice(index, 1);
    setEditFormData({
      ...editFormData,
      stops: updatedStops
    });
  };

  const handleAddRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdRoute = await routeService.createRoute(newRoute);
      setRoutes([...routes, createdRoute]);
      setNewRoute({
        origin: '',
        destination: '',
        distance: 0,
        duration: 0,
        price: 0,
        schedule: {
          departure: '',
          arrival: ''
        },
        serviceType: 'Ordinario',
        stops: [],
        active: true
      });
    } catch (err) {
      console.error('Error al crear ruta:', err);
      setError('Error al crear la ruta');
    }
  };

  const handleEditClick = (route: Route) => {
    setEditingId(route._id);
    setEditFormData({
      origin: route.origin,
      destination: route.destination,
      distance: route.distance,
      duration: route.duration,
      price: route.price,
      schedule: {
        departure: route.schedule.departure,
        arrival: route.schedule.arrival
      },
      serviceType: route.serviceType,
      stops: route.stops,
      active: route.active
    });
  };

  const handleUpdateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    try {
      const updatedRoute = await routeService.updateRoute(editingId, editFormData);
      setRoutes(routes.map(route => 
        route._id === editingId ? updatedRoute : route
      ));
      setEditingId(null);
    } catch (err) {
      console.error('Error al actualizar ruta:', err);
      setError('Error al actualizar la ruta');
    }
  };

  const handleDeleteRoute = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ruta?')) {
      try {
        await routeService.deleteRoute(id);
        setRoutes(routes.filter(route => route._id !== id));
      } catch (err) {
        console.error('Error al eliminar ruta:', err);
        setError('Error al eliminar la ruta');
      }
    }
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 
      ? `${hours}h ${mins > 0 ? mins + 'min' : ''}`
      : `${mins}min`;
  };

  if (loading) {
    return <div className="p-6">Cargando rutas...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Administrar Rutas</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Agregar Nueva Ruta</h2>
        <form onSubmit={handleAddRoute} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
              <select
                name="origin"
                value={newRoute.origin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecciona origen</option>
                {locations.map(loc => (
                  <option key={loc._id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
              <select
                name="destination"
                value={newRoute.destination}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecciona destino</option>
                {locations.map(loc => (
                  <option key={loc._id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distancia (km)</label>
              <input
                type="number"
                name="distance"
                value={newRoute.distance || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="0.1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
              <input
                type="number"
                name="duration"
                value={newRoute.duration || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($MXN)</label>
              <input
                type="number"
                name="price"
                value={newRoute.price || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="0.5"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Salida</label>
              <input
                type="time"
                name="departure"
                value={newRoute.schedule.departure}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Llegada</label>
              <input
                type="time"
                name="arrival"
                value={newRoute.schedule.arrival}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Servicio</label>
            <select
              name="serviceType"
              value={newRoute.serviceType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Ordinario">Ordinario</option>
              <option value="Rápido">Rápido</option>
              <option value="Directo">Directo</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paradas</label>
            <div className="flex space-x-2 mb-2">
              <select
                value={stopInput}
                onChange={(e) => setStopInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona una parada</option>
                {locations
                  .filter(loc => loc.name !== newRoute.origin && loc.name !== newRoute.destination)
                  .map(loc => (
                    <option key={loc._id} value={loc.name}>{loc.name}</option>
                  ))
                }
              </select>
              <button
                type="button"
                onClick={handleAddStop}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Agregar
              </button>
            </div>
            
            {newRoute.stops.length > 0 ? (
              <div className="mt-2 space-y-2">
                {newRoute.stops.map((stop, index) => (
                  <div key={index} className="flex items-center bg-gray-100 p-2 rounded">
                    <span className="flex-1">{stop}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStop(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay paradas definidas</p>
            )}
          </div>
          
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Ruta
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Rutas Existentes</h2>
        
        {routes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origen</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distancia</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routes.map((route) => (
                  <React.Fragment key={route._id}>
                    {editingId === route._id ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-4">
                          <form onSubmit={handleUpdateRoute} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
                                <select
                                  name="origin"
                                  value={editFormData.origin}
                                  onChange={handleEditInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                  required
                                >
                                  <option value="">Selecciona origen</option>
                                  {locations.map(loc => (
                                    <option key={loc._id} value={loc.name}>{loc.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                                <select
                                  name="destination"
                                  value={editFormData.destination}
                                  onChange={handleEditInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                  required
                                >
                                  <option value="">Selecciona destino</option>
                                  {locations.map(loc => (
                                    <option key={loc._id} value={loc.name}>{loc.name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Distancia (km)</label>
                                <input
                                  type="number"
                                  name="distance"
                                  value={editFormData.distance || ''}
                                  onChange={handleEditInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                  min="0"
                                  step="0.1"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duración (minutos)</label>
                                <input
                                  type="number"
                                  name="duration"
                                  value={editFormData.duration || ''}
                                  onChange={handleEditInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                  min="0"
                                  step="1"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($MXN)</label>
                                <input
                                  type="number"
                                  name="price"
                                  value={editFormData.price || ''}
                                  onChange={handleEditInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                  min="0"
                                  step="0.5"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Salida</label>
                                <input
                                  type="time"
                                  name="departure"
                                  value={editFormData.schedule.departure}
                                  onChange={handleEditInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Llegada</label>
                                <input
                                  type="time"
                                  name="arrival"
                                  value={editFormData.schedule.arrival}
                                  onChange={handleEditInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Servicio</label>
                              <select
                                name="serviceType"
                                value={editFormData.serviceType}
                                onChange={handleEditInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                              >
                                <option value="Ordinario">Ordinario</option>
                                <option value="Rápido">Rápido</option>
                                <option value="Directo">Directo</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Paradas</label>
                              <div className="flex space-x-2 mb-2">
                                <select
                                  value={editStopInput}
                                  onChange={(e) => setEditStopInput(e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                >
                                  <option value="">Selecciona una parada</option>
                                  {locations
                                    .filter(loc => loc.name !== editFormData.origin && loc.name !== editFormData.destination)
                                    .map(loc => (
                                      <option key={loc._id} value={loc.name}>{loc.name}</option>
                                    ))
                                  }
                                </select>
                                <button
                                  type="button"
                                  onClick={handleEditAddStop}
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                  Agregar
                                </button>
                              </div>
                              
                              {editFormData.stops.length > 0 ? (
                                <div className="mt-2 space-y-2">
                                  {editFormData.stops.map((stop, index) => (
                                    <div key={index} className="flex items-center bg-gray-100 p-2 rounded">
                                      <span className="flex-1">{stop}</span>
                                      <button
                                        type="button"
                                        onClick={() => handleEditRemoveStop(index)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">No hay paradas definidas</p>
                              )}
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                              >
                                Guardar
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded"
                              >
                                Cancelar
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap">{route.origin}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{route.destination}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{route.distance} km</td>
                        <td className="px-4 py-4 whitespace-nowrap">{formatDuration(route.duration)}</td>
                        <td className="px-4 py-4 whitespace-nowrap">${route.price}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {route.schedule.departure} - {route.schedule.arrival}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleEditClick(route)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteRoute(route._id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No hay rutas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AdminRoutes;
