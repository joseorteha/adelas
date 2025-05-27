import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Calendar, Lock, Bus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Passenger, TripInfo, SelectedTrip, PaymentMethod } from '../types'

interface PaymentProps {
  total: number
  onPaymentComplete: () => void
  tripInfo: TripInfo | null
  selectedTrip: SelectedTrip | null
  passengers: Passenger[]
}

const Payment: React.FC<PaymentProps> = ({ total, onPaymentComplete, tripInfo, selectedTrip, passengers }) => {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')

  const handlePayment = async () => {
    // Simulating payment process
    await new Promise(resolve => setTimeout(resolve, 2000))
    onPaymentComplete()
    navigate('/tickets')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800">Métodos de Pago</h1>
        <div className="flex space-x-4">
          <div className="w-4 h-4 rounded-full bg-purple-800"></div>
          <div className="w-4 h-4 rounded-full bg-purple-800"></div>
          <div className="w-4 h-4 rounded-full bg-purple-800"></div>
          <div className="w-4 h-4 rounded-full bg-purple-800 ring-4 ring-purple-300"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex space-x-4 mb-6">
              <button
                className={`py-2 px-4 rounded-lg border ${
                  paymentMethod === 'credit'
                    ? 'border-red-500 text-red-500'
                    : 'border-gray-300 text-gray-500'
                }`}
                onClick={() => setPaymentMethod('credit')}
              >
                <div className="flex items-center">
                  <img src="/path-to-visa-logo.png" alt="Visa" className="h-6 mr-2" />
                  <img src="/path-to-mastercard-logo.png" alt="Mastercard" className="h-6 mr-2" />
                  <img src="/path-to-amex-logo.png" alt="Amex" className="h-6" />
                </div>
                Crédito/Débito
              </button>
              <button
                className={`py-2 px-4 rounded-lg border ${
                  paymentMethod === 'saldo_max'
                    ? 'border-red-500 text-red-500'
                    : 'border-gray-300 text-gray-500'
                }`}
                onClick={() => setPaymentMethod('saldo_max')}
              >
                <img src="/path-to-saldo-max-logo.png" alt="SALDO MAX" className="h-6" />
                SALDO MAX
              </button>
              <button
                className={`py-2 px-4 rounded-lg border ${
                  paymentMethod === 'paypal'
                    ? 'border-red-500 text-red-500'
                    : 'border-gray-300 text-gray-500'
                }`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <img src="/path-to-paypal-logo.png" alt="PayPal" className="h-6" />
                PayPal
              </button>
            </div>

            {paymentMethod === 'credit' && (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card-number">
                    Número de tarjeta*
                  </label>
                  <div className="flex items-center">
                    <CreditCard className="text-gray-500 mr-2" />
                    <input
                      type="text"
                      id="card-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="xxxx xxxx xxxx 0000"
                    />
                  </div>
                </div>
                <div className="mb-4 flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiry-date">
                      Fecha de expiración*
                    </label>
                    <div className="flex items-center">
                      <Calendar className="text-gray-500 mr-2" />
                      <select
                        id="expiry-month"
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                      >
                        <option value="">Mes</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <select
                        id="expiry-year"
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Año</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <option key={year} value={year.toString().substr(-2)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                      CVV*
                    </label>
                    <div className="flex items-center">
                      <Lock className="text-gray-500 mr-2" />
                      <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4">*CAMPOS OBLIGATORIOS</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Resumen del Viaje</h2>
          {tripInfo && selectedTrip && (
            <div>
              <div className="flex items-center mb-4">
                <Bus className="text-red-500 mr-2" />
                <h3 className="text-lg font-semibold">Viaje de ida</h3>
              </div>
              <p><strong>{selectedTrip.departure}</strong></p>
              <p><strong>Origen:</strong> {tripInfo.origin}</p>
              <p><strong>Destino:</strong> {tripInfo.destination}</p>
              <p><strong>{tripInfo.date}</strong></p>
              <p><strong>Pasajeros:</strong> {passengers.length} Adulto(s)</p>
              <div className="mt-4">
                <p><strong>Viaje de ida:</strong> ${(total / 1.16).toFixed(2)}</p>
                <p><strong>Subtotal:</strong> ${(total / 1.16).toFixed(2)}</p>
                <p><strong>IVA:</strong> ${(total - (total / 1.16)).toFixed(2)}</p>
                <p><strong>{passengers.length} Asistencia(s) Total:</strong> $17.00</p>
                <p className="text-xl font-bold mt-2">Total: ${total.toFixed(2)} MXN</p>
                <p className="text-xs text-gray-500">Precios incluyen IVA</p>
              </div>
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-6"
          >
            Pagar ${total.toFixed(2)} MXN
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Payment