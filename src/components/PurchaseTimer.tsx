import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface PurchaseTimerProps {
  initialMinutes: number
  initialSeconds: number
}

const PurchaseTimer: React.FC<PurchaseTimerProps> = ({ initialMinutes = 5, initialSeconds = 0 }) => {
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer)
          alert('El tiempo para completar tu compra ha expirado. Serás redirigido a la página de inicio.')
          navigate('/')
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [minutes, seconds, navigate])

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
      <p className="font-bold">Tiempo restante para completar tu compra:</p>
      <p>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
    </div>
  )
}

export default PurchaseTimer