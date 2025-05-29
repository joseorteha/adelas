import React, { useState, useEffect } from 'react';
import { locationService } from '../../services/locationService';
import { Location } from '../../types';

const AdminLocations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el formulario
  const [newLocation, setNewLocation] = useState({
    name: '',
    state: '',
    type: 'ciudad'
  });
  
  // Estado para la edición
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    state: '',
    type: 'ciudad'
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await locationService.getAllLocations();
      setLocations(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar ubicaciones:', err);
      setError('Error al cargar las ubicaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLocation({ ...newLocation, [name]: value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdLocation = await locationService.createLocation(newLocation);
      setLocations([...locations, createdLocation]);
      setNewLocation({ name: '', state: '', type: 'ciudad' });
    } catch (err) {
      console.error('Error al crear ubicación:', err);
      setError('Error al crear la ubicación');
    }
  };

  const handleEditClick = (location: Location) => {
    setEditingId(location._id || null);
    setEditFormData({
      name: location.name,
      state: location.state || '',
      type: location.type || 'ciudad'
    });
  };

  const handleUpdateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    try {
      const updatedLocation = await locationService.updateLocation(editingId, editFormData);
      
      setLocations(locations.map(loc => 
        loc._id === editingId ? updatedLocation : loc
      ));
      
      setEditingId(null);
    } catch (err) {
      console.error('Error al actualizar ubicación:', err);
      setError('Error al actualizar la ubicación');
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
      try {
        await locationService.deleteLocation(id);
        setLocations(locations.filter(loc => loc._id !== id));
      } catch (err) {
        console.error('Error al eliminar ubicación:', err);
        setError('Error al eliminar la ubicación');
      }
    }
  };

  if (loading) {
    return <div className="p-6">Cargando ubicaciones...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Administrar Ubicaciones</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Agregar Nueva Ubicación</h2>
        <form onSubmit={handleAddLocation} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={newLocation.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <input
              type="text"
              name="state"
              value={newLocation.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              name="type"
              value={newLocation.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="ciudad">Ciudad</option>
              <option value="pueblo">Pueblo</option>
              <option value="comunidad">Comunidad</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Agregar Ubicación
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Ubicaciones Existentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location) => (
                <tr key={location._id}>
                  {editingId === location._id ? (
                    <td colSpan={4} className="px-6 py-4">
                      <form onSubmit={handleUpdateLocation} className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <input
                              type="text"
                              name="state"
                              value={editFormData.state}
                              onChange={handleEditInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <select
                              name="type"
                              value={editFormData.type}
                              onChange={handleEditInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="ciudad">Ciudad</option>
                              <option value="pueblo">Pueblo</option>
                              <option value="comunidad">Comunidad</option>
                            </select>
                          </div>
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
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{location.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{location.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{location.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEditClick(location)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteLocation(location._id || '')}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLocations;
