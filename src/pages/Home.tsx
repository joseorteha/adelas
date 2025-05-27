import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Shield, Clock, Truck, Heart, Star, DollarSign } from 'lucide-react'
import { locationService } from '../services/locationService'
import { Location } from '../types'

const Home: React.FC = () => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [locations, setLocations] = useState<Location[]>([])
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const tripInfo = { origin, destination, date, passengers }
    localStorage.setItem('tripInfo', JSON.stringify(tripInfo))
    navigate('/search-results')
  }

  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
    
    // Cargar las ubicaciones desde el backend
    const fetchLocations = async () => {
      try {
        const data = await locationService.getAllLocations()
        setLocations(data)
      } catch (error) {
        console.error('Error al cargar ubicaciones:', error)
        // Datos de respaldo en caso de error
        setLocations([
          { name: 'Orizaba' },
          { name: 'Zongolica' },
          { name: 'Cuautlamanca' },
          { name: 'Zacamilola' },
          { name: 'Xoxocotla' }
        ])
      }
    }

    fetchLocations()
  }, [])

  const services = [
    { icon: <Clock className="w-12 h-12 text-orange-500" />, title: 'Puntualidad', description: 'Salidas y llegadas a tiempo' },
    { icon: <Truck className="w-12 h-12 text-orange-500" />, title: 'Envíos', description: 'Servicio de paquetería confiable' },
    { icon: <Star className="w-12 h-12 text-orange-500" />, title: 'Confort', description: 'Viajes cómodos y placenteros' },
  ]

  const values = [
    { icon: <Shield className="w-12 h-12 text-blue-500" />, title: 'Seguridad', description: 'Tu bienestar es nuestra prioridad' },
    { icon: <Heart className="w-12 h-12 text-blue-500" />, title: 'Compromiso', description: 'Dedicados a un servicio excepcional' },
    { icon: <DollarSign className="w-12 h-12 text-blue-500" />, title: 'Economía', description: 'Precios justos y competitivos' },
  ]

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl p-8 mb-16 mt-32 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl font-bold mb-6 text-center text-white animate-fade-in-down">¿A dónde te vamos a llevar?</h1>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="origin" className="block text-sm font-medium text-white">Origen</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="pl-10 w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 text-white"
                    required
                  >
                    <option value="" className="text-gray-700">Selecciona el origen</option>
                    {locations.map((location) => (
                      <option key={location._id || location.name} value={location.name} className="text-gray-700">{location.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="destination" className="block text-sm font-medium text-white">Destino</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10 w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 text-white"
                    required
                  >
                    <option value="" className="text-gray-700">Selecciona el destino</option>
                    {locations.map((location) => (
                      <option key={location._id || location.name} value={location.name} className="text-gray-700">{location.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium text-white">Fecha</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 text-white"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="passengers" className="block text-sm font-medium text-white">Pasajeros</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    min="1"
                    className="pl-10 w-full p-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105">
                  Buscar Viaje
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-2 text-white">{service.title}</h3>
                <p className="text-gray-200 text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-6xl px-4 mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-2 text-white">{value.title}</h3>
                <p className="text-gray-200 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home