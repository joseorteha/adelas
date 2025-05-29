import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin, Users } from 'lucide-react'
import { TripInfo, SelectedTrip } from '../types'
import { routeService, Route } from '../services/routeService'

const SearchResults: React.FC = () => {
  const navigate = useNavigate()
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null)
  const [availableTrips, setAvailableTrips] = useState<SelectedTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true)
        const storedTripInfo = localStorage.getItem('tripInfo')
        
        if (storedTripInfo) {
          const parsedTripInfo = JSON.parse(storedTripInfo)
          setTripInfo(parsedTripInfo)
          
          // Buscar rutas reales desde el backend
          const { origin, destination } = parsedTripInfo
          const routes = await routeService.searchRoutes(origin, destination)
          
          if (routes && routes.length > 0) {
            // Convertir las rutas a formato de viaje
            const trips = convertRoutesToTrips(routes)
            setAvailableTrips(trips)
          } else {
            // No hay rutas disponibles para esta búsqueda
            setAvailableTrips([])
          }
        }
        setError(null)
      } catch (err) {
        console.error('Error al buscar rutas:', err)
        setError('Error al cargar las rutas disponibles')
        setAvailableTrips([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrips()
  }, [])

  // Convierte las rutas obtenidas del backend a formato de viaje para mostrar
  const convertRoutesToTrips = (routes: Route[]): SelectedTrip[] => {
    return routes.map((route) => {
      // Calcular duración en formato legible
      const durationHours = Math.floor(route.duration / 60)
      const durationMinutes = route.duration % 60
      const durationText = durationHours > 0 
        ? `${durationHours}h ${durationMinutes > 0 ? durationMinutes + 'm' : ''}` 
        : `${durationMinutes}m`
      
      // Usar el tipo de servicio de la ruta o valor por defecto
      const serviceType = route.serviceType || 'Ordinario'
      
      // Generar asientos disponibles aleatoriamente (esto debería venir del backend)
      const seats = generateSeatsEstimate()
      
      return {
        id: route._id,
        company: 'Adelas',
        departure: route.schedule.departure,
        arrival: route.schedule.arrival,
        duration: durationText,
        price: route.price,
        seats: seats,
        serviceType: serviceType
      }
    })
  }
  
  // Generamos un número aproximado de asientos disponibles en lugar de valores reales
  // Nota: En una implementación real, esto vendría del backend
  const generateSeatsEstimate = () => {
    return Math.floor(Math.random() * 20) + 25
  }

  // Verificar si el usuario está autenticado antes de seleccionar un viaje
  const handleSelectTrip = (trip: SelectedTrip) => {
    // Verificar si hay un token de autenticación
    const token = localStorage.getItem('authToken')
    
    if (!token) {
      // Si no hay token, redirigir a inicio de sesión
      alert('Debe iniciar sesión para continuar con la compra')
      // Guardar el viaje seleccionado para recuperarlo después del login
      localStorage.setItem('pendingTrip', JSON.stringify(trip))
      navigate('/login?redirect=seat-selection')
      return
    }
    
    // Si hay token, continuar normalmente
    localStorage.setItem('selectedTrip', JSON.stringify(trip))
    navigate('/seat-selection')
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando resultados...</div>
  }
  
  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500 text-center">{error}</div>
  }
  
  if (!tripInfo) {
    return <div className="container mx-auto px-4 py-8 text-center">No se encontró información de viaje</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Horarios y precios de ida</h1>
      <div className="mb-4">
        <p><strong>Origen:</strong> {tripInfo.origin}</p>
        <p><strong>Destino:</strong> {tripInfo.destination}</p>
        <p><strong>Fecha:</strong> {tripInfo.date}</p>
        <p><strong>Pasajeros:</strong> {tripInfo.passengers}</p>
      </div>
      <div className="space-y-4">
        {availableTrips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <MapPin className="text-orange-500 mr-2" size={24} />
                <span className="text-lg font-semibold">{trip.company}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="text-gray-600 mr-1" />
                  <span>{trip.departure} - {trip.arrival}</span>
                </div>
                <div className="text-lg font-bold text-orange-500">
                  ${trip.price} MXN
                </div>
                <button
                  onClick={() => handleSelectTrip(trip)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Seleccionar
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <span>Duración: {trip.duration}</span>
              <span className="ml-4 flex items-center">
                <Users className="mr-1" size={16} />
                Asientos disponibles: {trip.seats}
              </span>
              <span className="ml-4">Servicio: {trip.serviceType}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults