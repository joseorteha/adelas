// Tipos para la aplicación
export interface UserData {
  firstName: string
  lastName: string
  gender: string
  email: string
  birthdate: string
  phone: string
  address: string
  balance: number
}

export interface PaymentMethod {
  type: 'card' | 'electronic_balance'
  cardNumber?: string
  expiryDate?: string
  balance?: number
}

// Tipo para información de viaje
export interface TripInfo {
  origin: string
  destination: string
  date: string
  passengers: number
}

// Tipo para viaje seleccionado
export interface SelectedTrip {
  id: number | string
  company: string
  departure: string
  arrival: string
  duration: string
  price: number
  seats: number
  serviceType: string
}

// Tipos para rutas y horarios basados en el modelo del backend
export interface Route {
  _id: string
  origin: string
  destination: string
  distance: number
  duration: number
  price: number
  schedule: {
    departure: string
    arrival: string
  }
  stops: string[]
  active: boolean
}

// Tipo para ubicaciones
export interface Location {
  _id?: string
  name: string
  state?: string
  type?: string
  active?: boolean
}