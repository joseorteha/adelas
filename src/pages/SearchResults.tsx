import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin, Users } from 'lucide-react'
import { TripInfo, SelectedTrip, Route } from '../types'
import { routeService } from '../services/routeService'

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
            // Si no hay rutas, crear algunos datos de respaldo
            generateAvailableTrips(parsedTripInfo)
          }
        }
        setError(null)
      } catch (err) {
        console.error('Error al buscar rutas:', err)
        setError('Error al cargar las rutas disponibles')
        
        // En caso de error, usamos los datos de respaldo
        if (tripInfo) {
          generateAvailableTrips(tripInfo)
        }
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
      
      // Determinar tipo de servicio basado en la distancia (solo ejemplo)
      const serviceType = route.distance > 30 ? 'Rápido' : 'Ordinario'
      
      // Generar asientos disponibles aleatoriamente (esto debería venir del backend)
      const seats = generateRandomSeats()
      
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
  
  const generateRandomSeats = () => {
    return Math.floor(Math.random() * 20) + 25 // Genera un número aleatorio entre 25 y 44
  }

  const generateAvailableTrips = (info: TripInfo) => {
    const { origin, destination, date } = info
    const route = `${origin}-${destination}`
    const trips: SelectedTrip[] = []

    const isWeekend = new Date(date).getDay() === 0 || new Date(date).getDay() === 6

    if (route === 'Zongolica-Orizaba' || route === 'Orizaba-Zongolica') {
      if (isWeekend) {
        trips.push(
          { id: 1, company: 'Adelas', departure: '07:00', arrival: '09:00', duration: '2h', price: 45, seats: generateRandomSeats(), serviceType: 'Ordinario' },
          { id: 2, company: 'Adelas', departure: '07:30', arrival: '09:00', duration: '1h 30m', price: 50, seats: generateRandomSeats(), serviceType: 'Rápido' },
          { id: 3, company: 'Adelas', departure: '08:00', arrival: '09:15', duration: '1h 15m', price: 55, seats: generateRandomSeats(), serviceType: 'Directo' }
        )
      } else {
        trips.push(
          { id: 1, company: 'Adelas', departure: '07:00', arrival: '09:00', duration: '2h', price: 40, seats: generateRandomSeats(), serviceType: 'Ordinario' },
          { id: 2, company: 'Adelas', departure: '07:30', arrival: '09:00', duration: '1h 30m', price: 45, seats: generateRandomSeats(), serviceType: 'Rápido' },
          { id: 3, company: 'Adelas', departure: '08:00', arrival: '09:15', duration: '1h 15m', price: 50, seats: generateRandomSeats(), serviceType: 'Directo' }
        )
      }
    } else {
      // Generar viajes genéricos para otras rutas
      if (isWeekend) {
        trips.push(
          { id: 1, company: 'Adelas', departure: '08:00', arrival: '10:00', duration: '2h', price: 55, seats: generateRandomSeats(), serviceType: 'Ordinario' },
          { id: 2, company: 'Adelas', departure: '09:00', arrival: '10:30', duration: '1h 30m', price: 65, seats: generateRandomSeats(), serviceType: 'Rápido' }
        )
      } else {
        trips.push(
          { id: 1, company: 'Adelas', departure: '08:00', arrival: '10:00', duration: '2h', price: 50, seats: generateRandomSeats(), serviceType: 'Ordinario' },
          { id: 2, company: 'Adelas', departure: '09:00', arrival: '10:30', duration: '1h 30m', price: 60, seats: generateRandomSeats(), serviceType: 'Rápido' }
        )
      }
    }

    setAvailableTrips(trips)
  }

  const handleSelectTrip = (trip: SelectedTrip) => {
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