// Definición de los tipos compartidos en la aplicación

// Información de una localidad/ubicación
export interface Location {
  _id?: string;
  name: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  active?: boolean;
}

// Información de una ruta
export interface Route {
  _id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  price: number;
  schedule: {
    departure: string;
    arrival: string;
  };
  serviceType: 'Ordinario' | 'Rápido' | 'Directo';
  stops: string[];
  active: boolean;
}

// Información del viaje para la búsqueda
export interface TripInfo {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

// Información de un viaje seleccionado
export interface SelectedTrip {
  id: number | string;
  company: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  seats: number;
  serviceType: string;
}

// Información del perfil de usuario
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}
