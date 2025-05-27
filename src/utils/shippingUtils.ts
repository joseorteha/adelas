interface ShippingInfo {
  origin: string
  destination: string
  date: string
  weight: string
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

interface ShippingGuide {
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

export const generateShippingGuide = (shippingInfo: ShippingInfo): ShippingGuide => {
  const trackingNumber = generateTrackingNumber()
  const estimatedDelivery = calculateEstimatedDelivery(shippingInfo.date)
  const price = calculateShippingPrice(shippingInfo.origin, shippingInfo.destination, parseFloat(shippingInfo.weight))

  return {
    ...shippingInfo,
    trackingNumber,
    estimatedDelivery,
    price,
  }
}

const generateTrackingNumber = (): string => {
  const prefix = 'ADS'
  const randomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  return `${prefix}${randomNumbers}`
}

const calculateEstimatedDelivery = (shippingDate: string): string => {
  try {
    const date = new Date(shippingDate)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }
    date.setDate(date.getDate() + 2) // Asumimos entrega en 2 días
    return date.toISOString().split('T')[0]
  } catch (error) {
    console.error('Error calculating estimated delivery:', error)
    // Return a fallback date (e.g., 2 days from now)
    const fallbackDate = new Date()
    fallbackDate.setDate(fallbackDate.getDate() + 2)
    return fallbackDate.toISOString().split('T')[0]
  }
}

const calculateShippingPrice = (origin: string, destination: string, weight: number): number => {
  // Lógica simplificada de cálculo de precio
  const basePrice = 50
  const pricePerKg = 10
  return basePrice + (weight * pricePerKg)
}

export const trackShipment = async (trackingNumber: string): Promise<any> => {
  // Simulación de una llamada a la API para obtener información de seguimiento
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simula una demora en la red

  // Genera información de seguimiento aleatoria
  const statuses = ['En tránsito', 'En centro de distribución', 'En ruta de entrega', 'Entregado']
  const currentStatus = statuses[Math.floor(Math.random() * statuses.length)]
  const locations = ['Orizaba', 'Zongolica', 'Cuautlamanca', 'Zacamilola', 'Xoxocotla']
  const currentLocation = locations[Math.floor(Math.random() * locations.length)]

  const today = new Date()
  const estimatedDelivery = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0]

  const trackingHistory = [
    { date: '2023-05-10', status: 'Paquete recibido', location: 'Orizaba' },
    { date: '2023-05-11', status: 'En tránsito', location: 'Zongolica' },
    { date: '2023-05-12', status: currentStatus, location: currentLocation },
  ]

  return {
    trackingNumber,
    status: currentStatus,
    currentLocation,
    estimatedDelivery,
    trackingHistory,
  }
}