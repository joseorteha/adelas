import React, { useState } from 'react'
import { Search, Package, Truck, MapPin, Calendar, CheckCircle, AlertTriangle, Clock, Info, Shield, Zap, Smile } from 'lucide-react'
import { motion } from 'framer-motion'
import { trackShipment } from '../utils/shippingUtils'

const TrackShipment: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingInfo, setTrackingInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const info = await trackShipment(trackingNumber)
      setTrackingInfo(info)
    } catch (err) {
      setError('No se pudo obtener la información de seguimiento. Por favor, intente de nuevo.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Seguimiento de Envío</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Rastrea tu paquete</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Ingresa tu número de guía"
              className="flex-grow p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Buscando...' : 'Rastrear'}
            </button>
          </form>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            <p>{error}</p>
          </motion.div>
        )}

        {trackingInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Estado del Envío</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold flex items-center"><Package className="mr-2 text-orange-500" /> Número de Guía: {trackingInfo.trackingNumber}</p>
                <p className="font-semibold flex items-center"><MapPin className="mr-2 text-orange-500" /> Ubicación Actual: {trackingInfo.currentLocation}</p>
                <p className="font-semibold flex items-center"><Clock className="mr-2 text-orange-500" /> Estado: {trackingInfo.status}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center"><Calendar className="mr-2 text-orange-500" /> Fecha Estimada de Entrega: {trackingInfo.estimatedDelivery}</p>
                <p className="font-semibold flex items-center"><Truck className="mr-2 text-orange-500" /> Servicio: Paquetería Terrestre</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Historial de Seguimiento</h3>
              <ul className="space-y-2">
                {trackingInfo.trackingHistory.map((event: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1">
                      {index === 0 ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{event.date}</p>
                      <p>{event.status} - {event.location}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-white bg-opacity-90 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Información de Seguimiento</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Info className="mr-2 text-blue-500 flex-shrink-0 mt-1" />
              <p>Nuestro sistema de seguimiento se actualiza en tiempo real para mantenerte informado sobre el estado de tu envío.</p>
            </li>
            <li className="flex items-start">
              <AlertTriangle className="mr-2 text-yellow-500 flex-shrink-0 mt-1" />
              <p>Si tu paquete parece estar retrasado, no te preocupes. A veces pueden ocurrir demoras inesperadas. Si el retraso persiste, contáctanos.</p>
            </li>
            <li className="flex items-start">
              <Shield className="mr-2 text-green-500 flex-shrink-0 mt-1" />
              <p>Todos nuestros envíos están asegurados y manejados con el máximo cuidado para garantizar la seguridad de tu paquete.</p>
            </li>
            <li className="flex items-start">
              <Zap className="mr-2 text-purple-500 flex-shrink-0 mt-1" />
              <p>Para una entrega más rápida, considera nuestras opciones de envío express disponibles en la mayoría de las rutas.</p>
            </li>
            <li className="flex items-start">
              <Smile className="mr-2 text-yellow-500 flex-shrink-0 mt-1" />
              <p>¿Satisfecho con nuestro servicio? ¡Nos encantaría escuchar tu opinión! Deja una reseña o comparte tu experiencia con nosotros.</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default TrackShipment