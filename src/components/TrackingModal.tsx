import React from 'react'
import { X } from 'lucide-react'

interface TrackingInfo {
  status: string
  location: string
  estimatedDelivery: string
  updates: { date: string; status: string }[]
}

interface TrackingModalProps {
  trackingInfo: TrackingInfo
  onClose: () => void
}

const TrackingModal: React.FC<TrackingModalProps> = ({ trackingInfo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Estado del Envío</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Estado actual: <span className="font-normal">{trackingInfo.status}</span></p>
          <p className="font-semibold">Ubicación: <span className="font-normal">{trackingInfo.location}</span></p>
          <p className="font-semibold">Entrega estimada: <span className="font-normal">{trackingInfo.estimatedDelivery}</span></p>
        </div>
        <h3 className="text-lg font-semibold mb-2">Actualizaciones</h3>
        <ul className="space-y-2">
          {trackingInfo.updates.map((update, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{update.date}</p>
              <p>{update.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TrackingModal