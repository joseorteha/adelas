import React from 'react'
import { User } from 'lucide-react'

interface BusSeatMapProps {
  availableSeats: number
  selectedSeats: string[]
  onSeatSelect: (seats: string[]) => void
  maxSeats: number
}

const BusSeatMap: React.FC<BusSeatMapProps> = ({ availableSeats, selectedSeats, onSeatSelect, maxSeats }) => {
  const totalSeats = 44
  const occupiedSeats = totalSeats - availableSeats

  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      onSeatSelect(selectedSeats.filter(seat => seat !== seatNumber))
    } else if (selectedSeats.length < maxSeats) {
      onSeatSelect([...selectedSeats, seatNumber])
    } else {
      alert(`No puedes seleccionar más de ${maxSeats} asiento(s).`)
    }
  }

  const renderSeat = (seatNumber: number) => {
    const seatString = seatNumber.toString()
    const isOccupied = seatNumber <= occupiedSeats
    const isSelected = selectedSeats.includes(seatString)
    const isAvailable = !isOccupied && !isSelected

    return (
      <button
        key={seatNumber}
        className={`w-12 h-12 m-1 rounded-t-lg flex items-center justify-center ${
          isOccupied ? 'bg-gray-500 cursor-not-allowed' :
          isSelected ? 'bg-green-500 hover:bg-green-600' :
          'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold transition-colors duration-200`}
        onClick={() => !isOccupied && handleSeatClick(seatString)}
        disabled={isOccupied}
      >
        <div className="flex flex-col items-center">
          <User size={16} className="mb-1" />
          <span className="text-xs">{seatNumber}</span>
        </div>
      </button>
    )
  }

  return (
    <div className="bus-seat-map bg-gray-100 p-8 rounded-lg">
      <div className="mb-8 flex justify-center">
        <div className="bg-gray-300 w-32 h-12 rounded-full flex items-center justify-center text-gray-700 font-bold">
          Conductor
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(44)].map((_, index) => renderSeat(index + 1))}
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2 rounded-full"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 mr-2 rounded-full"></div>
          <span>Seleccionado</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-500 mr-2 rounded-full"></div>
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  )
}

export default BusSeatMap