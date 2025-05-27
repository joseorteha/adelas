import React from 'react'
import { TripInfo, SelectedTrip, Passenger } from '../types'

interface DataConfirmationProps {
  passengers: Passenger[]
  email: string
  selectedSeats: string[]
  onContinue: () => void
  tripInfo: TripInfo | null
  selectedTrip: SelectedTrip | null
}

const DataConfirmation: React.FC<DataConfirmationProps> = ({ passengers, email, selectedSeats, onContinue, tripInfo, selectedTrip }) => {
  const calculateTotal = () => {
    if (selectedTrip) {
      const basePrice = selectedTrip.price
      const iva = basePrice * 0.16 // 16% IVA
      const total = (basePrice + iva) * selectedSeats.length
      return total.toFixed(2)
    }
    return '0.00'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Confirmación de datos</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Detalles del viaje</h3>
        <p>Fecha: {tripInfo?.date}</p>
        <p>Origen: {tripInfo?.origin}</p>
        <p>Destino: {tripInfo?.destination}</p>
        <p>Tipo de servicio: {selectedTrip?.serviceType}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pasajeros</h3>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-2">
            <p>
              <span className="font-semibold">Pasajero {index + 1}:</span> {passenger.name} {passenger.lastName}
            </p>
            <p>
              <span className="font-semibold">Asiento:</span> {passenger.seatNumber}
            </p>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Correo electrónico</h3>
        <p>{email}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Resumen de costos</h3>
        <p>Viaje de ida: ${selectedTrip ? (selectedTrip.price * selectedSeats.length).toFixed(2) : '0.00'}</p>
        <p>Subtotal: ${selectedTrip ? (selectedTrip.price * selectedSeats.length).toFixed(2) : '0.00'}</p>
        <p>IVA: ${selectedTrip ? (selectedTrip.price * 0.16 * selectedSeats.length).toFixed(2) : '0.00'}</p>
        <p className="font-bold mt-2">Total: ${calculateTotal()} MXN</p>
        <p className="text-sm">Precios incluyen IVA</p>
      </div>
      <button
        onClick={onContinue}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Continuar al pago
      </button>
    </div>
  )
}

export default DataConfirmation