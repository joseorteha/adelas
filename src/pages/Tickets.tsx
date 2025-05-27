import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Passenger, TripInfo, SelectedTrip } from '../types'
import Ticket from '../components/Ticket'
import { Printer, X, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Tickets: React.FC = () => {
  const navigate = useNavigate()
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [email, setEmail] = useState('')
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<SelectedTrip | null>(null)

  useEffect(() => {
    const storedPassengers = localStorage.getItem('passengers')
    const storedEmail = localStorage.getItem('email')
    const storedTripInfo = localStorage.getItem('tripInfo')
    const storedSelectedTrip = localStorage.getItem('selectedTrip')

    if (storedPassengers) setPassengers(JSON.parse(storedPassengers))
    if (storedEmail) setEmail(storedEmail)
    if (storedTripInfo) setTripInfo(JSON.parse(storedTripInfo))
    if (storedSelectedTrip) setSelectedTrip(JSON.parse(storedSelectedTrip))
  }, [])

  const handlePrint = () => {
    const input = document.getElementById('tickets-to-print')
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('boletos_adelas.pdf')
      })
    }
  }

  const handleClose = () => {
    navigate('/')
  }

  if (!tripInfo || !selectedTrip) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Tus Boletos</h1>
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
        <p className="font-bold">Aviso importante</p>
        <p>Tus boletos han sido enviados a tu correo electrónico. Por favor, revisa tu bandeja de entrada.</p>
      </div>
      <div id="tickets-to-print">
        {passengers.map((passenger, index) => (
          <Ticket
            key={index}
            passenger={`${passenger.name} ${passenger.lastName}`}
            origin={tripInfo.origin}
            destination={tripInfo.destination}
            date={tripInfo.date}
            departure={selectedTrip.departure}
            arrival={selectedTrip.arrival}
            seat={passenger.seatNumber}
            folio={`ADS${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
            email={email}
            serviceType={selectedTrip.serviceType}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={handlePrint}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Printer className="mr-2" />
          Imprimir Boletos
        </button>
        <button
          onClick={handleClose}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <X className="mr-2" />
          Cerrar y volver al inicio
        </button>
      </div>
    </div>
  )
}

export default Tickets