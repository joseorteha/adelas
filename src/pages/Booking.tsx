import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PassengerRegistration from '../components/PassengerRegistration'
import DataConfirmation from '../components/DataConfirmation'
import Payment from '../components/Payment'
import { TripInfo, SelectedTrip, Passenger, PaymentMethod } from '../types'

const Booking: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<SelectedTrip | null>(null)
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [email, setEmail] = useState('')
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  useEffect(() => {
    const storedTripInfo = localStorage.getItem('tripInfo')
    const storedSelectedTrip = localStorage.getItem('selectedTrip')
    if (storedTripInfo && storedSelectedTrip) {
      setTripInfo(JSON.parse(storedTripInfo))
      setSelectedTrip(JSON.parse(storedSelectedTrip))
      setSelectedSeats(Array(JSON.parse(storedTripInfo).passengers).fill('').map((_, i) => `${i + 1}`))
    } else {
      navigate('/')
    }

    // Load payment methods
    const storedPaymentMethods = localStorage.getItem('paymentMethods')
    if (storedPaymentMethods) {
      setPaymentMethods(JSON.parse(storedPaymentMethods))
    }
  }, [navigate])

  const handlePassengerRegistration = (registeredPassengers: Passenger[], registeredEmail: string) => {
    setPassengers(registeredPassengers)
    setEmail(registeredEmail)
    setStep(2)
  }

  const handleDataConfirmation = () => {
    setStep(3)
  }

  const handlePaymentComplete = () => {
    // Here you would typically handle the completion of the payment
    // For now, we'll just navigate to a success page
    navigate('/booking-success')
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <PassengerRegistration
            selectedSeats={selectedSeats}
            onContinue={handlePassengerRegistration}
          />
        )
      case 2:
        return (
          <DataConfirmation
            passengers={passengers}
            email={email}
            selectedSeats={selectedSeats}
            onContinue={handleDataConfirmation}
            tripInfo={tripInfo}
            selectedTrip={selectedTrip}
          />
        )
      case 3:
        return (
          <Payment
            total={selectedTrip ? selectedTrip.price * selectedSeats.length : 0}
            onPaymentComplete={handlePaymentComplete}
            tripInfo={tripInfo}
            selectedTrip={selectedTrip}
            passengers={passengers}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Reserva tu viaje</h1>
      {renderStepContent()}
    </div>
  )
}

export default Booking