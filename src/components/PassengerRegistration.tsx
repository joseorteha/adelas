import React, { useState } from 'react'

interface Passenger {
  name: string
  lastName: string
  seatNumber: string
}

interface PassengerRegistrationProps {
  selectedSeats: string[]
  onContinue: (passengers: Passenger[], email: string) => void
}

const PassengerRegistration: React.FC<PassengerRegistrationProps> = ({ selectedSeats, onContinue }) => {
  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map((seat) => ({ name: '', lastName: '', seatNumber: seat }))
  )
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handlePassengerChange = (index: number, field: 'name' | 'lastName', value: string) => {
    const updatedPassengers = [...passengers]
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value }
    setPassengers(updatedPassengers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === confirmEmail && agreeTerms) {
      onContinue(passengers, email)
    } else {
      alert('Por favor, verifica que los correos electrónicos coincidan y que hayas aceptado los términos y condiciones.')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Registro de pasajeros</h2>
      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Pasajero {index + 1} - Asiento {passenger.seatNumber}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700">Nombre(s)*</label>
                <input
                  type="text"
                  id={`name-${index}`}
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor={`lastName-${index}`} className="block text-sm font-medium text-gray-700">Apellido(s)*</label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enviar boletos a*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">Confirma el envío de boletos a*</label>
          <input
            type="email"
            id="confirmEmail"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mr-2"
              required
            />
            <span className="text-sm">De acuerdo con el Términos y Condiciones, así como el Aviso de Privacidad.</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Continuar
        </button>
      </form>
    </div>
  )
}

export default PassengerRegistration