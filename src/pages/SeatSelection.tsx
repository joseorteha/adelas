import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BusSeatMap from '../components/BusSeatMap'
import PurchaseTimer from '../components/PurchaseTimer'
import { TripInfo, SelectedTrip } from '../types'

const SeatSelection: React.FC = () => {
  const navigate = useNavigate()
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<SelectedTrip | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  useEffect(() => {
    const storedTripInfo = localStorage.getItem('tripInfo')
    const storedSelectedTrip = localStorage.getItem('selectedTrip')
    
    if (storedTripInfo) setTripInfo(JSON.parse(storedTripInfo))
    if (storedSelectedTrip) setSelectedTrip(JSON.parse(storedSelectedTrip))

    // Iniciar el temporizador
    const purchaseStartTime = Date.now()
    localStorage.setItem('purchaseStartTime', purchaseStartTime.toString())
  }, [])

  const handleSeatSelection = (seats: string[]) => {
    setSelectedSeats(seats)
  }

  const handleContinue = () => {
    if (tripInfo && selectedSeats.length === tripInfo.passengers) {
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats))
      navigate('/passenger-registration')
    } else {
      alert(`Por favor, selecciona exactamente ${tripInfo?.passengers} asiento(s).`)
    }
  }

  if (!tripInfo || !selectedTrip) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Selección de Asientos</h1>
      <PurchaseTimer initialMinutes={5} initialSeconds={0} />
      <div className="mb-4">
        <p><strong>Origen:</strong> {tripInfo.origin}</p>
        <p><strong>Destino:</strong> {tripInfo.destination}</p>
        <p><strong>Fecha:</strong> {tripInfo.date}</p>
        <p><strong>Pasajeros:</strong> {tripInfo.passengers}</p>
        <p><strong>Hora de Salida:</strong> {selectedTrip.departure}</p>
        <p><strong>Servicio:</strong> {selectedTrip.serviceType}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Selecciona tus asientos</h2>
        <BusSeatMap
          availableSeats={selectedTrip.seats}
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelection}
          maxSeats={tripInfo.passengers}
        />
        <div className="mt-4">
          <p>Asientos seleccionados: {selectedSeats.join(', ')}</p>
          <p>Asientos restantes por seleccionar: {tripInfo.passengers - selectedSeats.length}</p>
        </div>
      </div>
      <button
        onClick={handleContinue}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        disabled={selectedSeats.length !== tripInfo.passengers}
      >
        Continuar
      </button>
    </div>
  )
}

export default SeatSelection