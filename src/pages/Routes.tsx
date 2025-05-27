import React, { useEffect, useState } from 'react'
import { ChevronRight, ChevronDown, Clock, MapPin, DollarSign, Bus, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { routeService, Route } from '../services/routeService'

const Routes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null)
  const [expandedDay, setExpandedDay] = useState<string | null>(null)
  const [expandedGeneralRoutes, setExpandedGeneralRoutes] = useState(false)

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await routeService.getAllRoutes()
        setRoutes(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar las rutas')
        console.error('Error:', err)
        // Si hay un error, podemos cargar datos de respaldo
        setRoutes([])
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  const toggleRoute = (route: string) => {
    setExpandedRoute(expandedRoute === route ? null : route)
    setExpandedDay(null) // Reset expanded day when toggling route
  }

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day)
  }

  const toggleGeneralRoutes = () => {
    setExpandedGeneralRoutes(!expandedGeneralRoutes)
  }

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'Ordinario':
        return 'bg-blue-500 text-white'
      case 'Rápido':
        return 'bg-yellow-500 text-white'
      case 'Directo':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  // Adaptador para transformar las rutas de la API al formato que necesitamos para mostrar
  const formatRoutesForDisplay = (routes: Route[]) => {
    return routes.map(route => ({
      origin: route.origin,
      destination: route.destination,
      type: route.distance > 30 ? 'Rápido' : 'Ordinario', // Solo un ejemplo, esto debería venir del backend
      price: route.price
    }))
  }
  
  // Calcular las rutas generales basadas en los datos reales
  const generalRoutes = formatRoutesForDisplay(routes)

  if (loading) {
    return <div>Cargando rutas...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1570125909664-eb6b0b533929?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Rutas y Horarios</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Leyenda de servicios</h2>
            <div className="flex space-x-4">
              <span className="px-3 py-1 rounded-full bg-blue-500 text-white">Ordinario</span>
              <span className="px-3 py-1 rounded-full bg-yellow-500 text-white">Rápido</span>
              <span className="px-3 py-1 rounded-full bg-green-500 text-white">Directo</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div key={route._id} className="border rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-semibold mb-2">
                  {route.origin} → {route.destination}
                </h2>
                <div className="space-y-2">
                  <p><strong>Distancia:</strong> {route.distance} km</p>
                  <p><strong>Duración:</strong> {route.duration} minutos</p>
                  <p><strong>Precio:</strong> ${route.price}</p>
                  <p><strong>Salida:</strong> {route.schedule.departure}</p>
                  <p><strong>Llegada:</strong> {route.schedule.arrival}</p>
                  {route.stops.length > 0 && (
                    <div>
                      <strong>Paradas:</strong>
                      <ul className="list-disc list-inside">
                        {route.stops.map((stop, index) => (
                          <li key={index}>{stop}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <motion.div className="mt-8 border rounded-lg overflow-hidden shadow-md">
            <motion.div
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              onClick={toggleGeneralRoutes}
            >
              <div className="flex items-center">
                <MapPin className="text-orange-500 mr-2" size={24} />
                <h2 className="text-xl font-semibold">Rutas Generales</h2>
              </div>
              <motion.div
                animate={{ rotate: expandedGeneralRoutes ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="text-gray-600" size={24} />
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {expandedGeneralRoutes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {generalRoutes.length > 0 ? (
                      generalRoutes.map((route, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getServiceTypeColor(route.type)}`}>
                              {route.type}
                            </span>
                            <span className="font-bold text-orange-500">
                              <DollarSign className="inline-block mr-1" size={16} />
                              ${route.price}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <MapPin className="inline-block mr-1 text-gray-600" size={16} />
                              <span className="font-semibold">{route.origin}</span>
                            </div>
                            <ChevronRight className="text-gray-600" size={16} />
                            <div>
                              <MapPin className="inline-block mr-1 text-gray-600" size={16} />
                              <span className="font-semibold">{route.destination}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-4">
                        <p>No hay rutas disponibles en este momento. Intente más tarde.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Información adicional</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Calendar className="text-orange-500 mr-2" size={20} />
              Los horarios pueden variar en días festivos.
            </li>
            <li className="flex items-center">
              <Clock className="text-orange-500 mr-2" size={20} />
              Se recomienda llegar al menos 15 minutos antes de la salida.
            </li>
            <li className="flex items-center">
              <DollarSign className="text-orange-500 mr-2" size={20} />
              Niños menores de 3 años no pagan boleto si viajan en el regazo de un adulto.
            </li>
            <li className="flex items-center">
              <Bus className="text-orange-500 mr-2" size={20} />
              Para grupos grandes, por favor contacte nuestro servicio al cliente para tarifas especiales.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Routes