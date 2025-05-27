import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Passenger, TripInfo, SelectedTrip } from '../types'
import PurchaseTimer from '../components/PurchaseTimer'

const Confirmation: React.FC = () => {
  const navigate = useNavigate()
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [email, setEmail] = useState('')
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<SelectedTrip | null>(null)
  const [remainingTime, setRemainingTime] = useState({ minutes: 5, seconds: 0 })

  useEffect(() => {
    const storedPassengers = localStorage.getItem('passengers')
    const storedEmail = localStorage.getItem('email')
    const storedTripInfo = localStorage.getItem('tripInfo')
    const storedSelectedTrip = localStorage.getItem('selectedTrip')

    if (storedPassengers) setPassengers(JSON.parse(storedPassengers))
    if (storedEmail) setEmail(storedEmail)
    if (storedTripInfo) setTripInfo(JSON.parse(storedTripInfo))
    if (storedSelectedTrip) setSelectedTrip(JSON.parse(storedSelectedTrip))

    // Calcular el tiempo restante
    const purchaseStartTime = parseInt(localStorage.getItem('purchaseStartTime') || '0', 10)
    const elapsedTime = Math.floor((Date.now() - purchaseStartTime) / 1000)
    const remainingSeconds = Math.max(300 - elapsedTime, 0)
    setRemainingTime({
      minutes: Math.floor(remainingSeconds / 60),
      seconds: remainingSeconds % 60
    })
  }, [])

  const handleConfirm = () => {
    navigate('/payment')
  }

  if (!tripInfo || !selectedTrip) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Confirmación de Reserva</h1>
      <PurchaseTimer initialMinutes={remainingTime.minutes} initialSeconds={remainingTime.seconds} />
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Detalles del Viaje</h2>
        <p><strong>Origen:</strong> {tripInfo.origin}</p>
        <p><strong>Destino:</strong> {tripInfo.destination}</p>
        <p><strong>Fecha:</strong> {tripInfo.date}</p>
        <p><strong>Hora de Salida:</strong> {selectedTrip.departure}</p>
        <p><strong>Hora de Llegada:</strong> {selectedTrip.arrival}</p>
        <p><strong>Tipo de Servicio:</strong> {selectedTrip.serviceType}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Pasajeros</h2>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-2">
            <p><strong>Pasajero {index + 1}:</strong> {passenger.name} {passenger.lastName}</p>
            <p><strong>Asiento:</strong> {passenger.seatNumber}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
        <p><strong>Correo Electrónico:</strong> {email}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Resumen de Costos</h2>
        <p><strong>Precio por boleto:</strong> ${selectedTrip.price}</p>
        <p><strong>Número de boletos:</strong> {passengers.length}</p>
        <p><strong>Total:</strong> ${selectedTrip.price * passengers.length}</p>
      </div>
      <button
        onClick={handleConfirm}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      >
        Confirmar y Proceder al Pago
      </button>
    </div>
  )
}

export default Confirmation