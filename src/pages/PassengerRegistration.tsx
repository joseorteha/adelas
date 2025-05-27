import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Passenger } from '../types'
import PurchaseTimer from '../components/PurchaseTimer'

const PassengerRegistration: React.FC = () => {
  const navigate = useNavigate()
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [email, setEmail] = useState('')
  const [remainingTime, setRemainingTime] = useState({ minutes: 5, seconds: 0 })

  useEffect(() => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]')
    setPassengers(selectedSeats.map((seat: string) => ({ name: '', lastName: '', seatNumber: seat })))

    // Calcular el tiempo restante
    const purchaseStartTime = parseInt(localStorage.getItem('purchaseStartTime') || '0', 10)
    const elapsedTime = Math.floor((Date.now() - purchaseStartTime) / 1000)
    const remainingSeconds = Math.max(300 - elapsedTime, 0)
    setRemainingTime({
      minutes: Math.floor(remainingSeconds / 60),
      seconds: remainingSeconds % 60
    })
  }, [])

  const handlePassengerChange = (index: number, field: 'name' | 'lastName', value: string) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value }
    setPassengers(updatedPassengers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passengers.every(p => p.name && p.lastName) && email) {
      localStorage.setItem('passengers', JSON.stringify(passengers))
      localStorage.setItem('email', email)
      navigate('/confirmation')
    } else {
      alert('Por favor, completa todos los campos.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Registro de Pasajeros</h1>
      <PurchaseTimer initialMinutes={remainingTime.minutes} initialSeconds={remainingTime.seconds} />
      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Pasajero {index + 1} - Asiento {passenger.seatNumber}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Continuar
        </button>
      </form>
    </div>
  )
}

export default PassengerRegistration