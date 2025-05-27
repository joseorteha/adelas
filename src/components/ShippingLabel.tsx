import React from 'react'
import { Package, MapPin, Calendar, DollarSign, Phone, Mail, User } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface ShippingLabelProps {
  guide: {
    trackingNumber: string
    origin: string
    destination: string
    date: string
    weight: string
    estimatedDelivery: string
    price: number
    sender: {
      name: string
      phone: string
      email: string
    }
    recipient: {
      name: string
      phone: string
      email: string
    }
  }
}

const ShippingLabel: React.FC<ShippingLabelProps> = ({ guide }) => {
  return (
    <div className="bg-white border-2 border-orange-500 rounded-lg p-6 w-[600px] h-[400px] mx-auto text-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-orange-500">Adelas - Autobuses De la Sierra</h2>
          <p className="text-xs">Servicio de Paquetería</p>
        </div>
        <QRCodeSVG value={guide.trackingNumber} size={80} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-base mb-1">Detalles del envío</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-semibold">Origen:</p>
              <div className="flex items-center">
                <MapPin className="text-orange-500 mr-1" size={12} />
                <span>{guide.origin}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Destino:</p>
              <div className="flex items-center">
                <MapPin className="text-orange-500 mr-1" size={12} />
                <span>{guide.destination}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Fecha de envío:</p>
              <div className="flex items-center">
                <Calendar className="text-orange-500 mr-1" size={12} />
                <span>{guide.date}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Entrega estimada:</p>
              <div className="flex items-center">
                <Calendar className="text-orange-500 mr-1" size={12} />
                <span>{guide.estimatedDelivery}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Peso:</p>
              <div className="flex items-center">
                <Package className="text-orange-500 mr-1" size={12} />
                <span>{guide.weight} kg</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Precio:</p>
              <div className="flex items-center">
                <DollarSign className="text-orange-500 mr-1" size={12} />
                <span>${guide.price.toFixed(2)} MXN</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <h3 className="font-semibold text-base mb-1">Remitente:</h3>
            <div className="text-xs">
              <div className="flex items-center">
                <User className="text-orange-500 mr-1" size={12} />
                <span>{guide.sender.name}</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-orange-500 mr-1" size={12} />
                <span>{guide.sender.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-orange-500 mr-1" size={12} />
                <span>{guide.sender.email}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-1">Destinatario:</h3>
            <div className="text-xs">
              <div className="flex items-center">
                <User className="text-orange-500 mr-1" size={12} />
                <span>{guide.recipient.name}</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-orange-500 mr-1" size={12} />
                <span>{guide.recipient.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-orange-500 mr-1" size={12} />
                <span>{guide.recipient.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="bg-orange-100 p-2 rounded-lg mb-2">
          <p className="font-bold text-center text-base">Número de Seguimiento</p>
          <p className="text-xl text-center font-mono">{guide.trackingNumber}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs mt-2">
          <div>
            <p className="font-semibold">Firma de envío:</p>
            <div className="border-b border-gray-400 h-8 mt-1"></div>
          </div>
          <div>
            <p className="font-semibold">Firma de recibido:</p>
            <div className="border-b border-gray-400 h-8 mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingLabel