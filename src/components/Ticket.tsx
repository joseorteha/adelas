import React from 'react'
import { Bus, Calendar, MapPin, Clock, User, Mail } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface TicketProps {
  passenger: string
  origin: string
  destination: string
  date: string
  departure: string
  arrival: string
  seat: string
  folio: string
  email: string
  serviceType: string
}

const Ticket: React.FC<TicketProps> = ({
  passenger,
  origin,
  destination,
  date,
  departure,
  arrival,
  seat,
  folio,
  email,
  serviceType
}) => {
  const ticketInfo = JSON.stringify({
    folio,
    passenger,
    origin,
    destination,
    date,
    departure,
    arrival,
    seat,
    serviceType,
    company: 'Adelas - Autobuses De la Sierra'
  })

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto my-4 page-break-after-always">
      <div className="bg-orange-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Adelas - Autobuses De la Sierra</h2>
          <Bus size={32} />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="text-center text-green-600 font-semibold mb-4 flex items-center justify-center">
          <Mail className="mr-2" />
          Boletos enviados a: {email}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="text-gray-500" />
            <span className="font-semibold">{passenger}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="text-gray-500" />
            <span>{date}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Origen</div>
            <div className="flex items-center space-x-1">
              <MapPin className="text-orange-500" size={18} />
              <span className="font-semibold">{origin}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Destino</div>
            <div className="flex items-center space-x-1">
              <MapPin className="text-orange-500" size={18} />
              <span className="font-semibold">{destination}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Salida</div>
            <div className="flex items-center space-x-1">
              <Clock className="text-orange-500" size={18} />
              <span className="font-semibold">{departure}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Llegada</div>
            <div className="flex items-center space-x-1">
              <Clock className="text-orange-500" size={18} />
              <span className="font-semibold">{arrival}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
          <span className="font-bold text-lg">Asiento: {seat}</span>
          <span className="font-bold text-lg">Servicio: {serviceType}</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <QRCodeSVG value={ticketInfo} size={128} />
          <div className="text-sm font-semibold">Folio: {folio}</div>
        </div>
      </div>
      <div className="bg-orange-500 text-white p-4 text-center">
        <p className="text-sm">Gracias por viajar con Adelas - Autobuses De la Sierra</p>
      </div>
    </div>
  )
}

export default Ticket