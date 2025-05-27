import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Route from '../models/route.model';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adelas-transportes';

const sampleRoutes = [
  {
    origin: 'Zongolica',
    destination: 'Orizaba',
    distance: 45,
    duration: 90,
    price: 40,
    schedule: {
      departure: '06:00',
      arrival: '07:30'
    },
    stops: ['Tequila', 'Cuichapa'],
    active: true
  },
  {
    origin: 'Orizaba',
    destination: 'Zongolica',
    distance: 45,
    duration: 90,
    price: 40,
    schedule: {
      departure: '05:30',
      arrival: '07:00'
    },
    stops: ['Cuichapa', 'Tequila'],
    active: true
  },
  {
    origin: 'Orizaba',
    destination: 'Tehuipango',
    distance: 85,
    duration: 150,
    price: 60,
    schedule: {
      departure: '07:00',
      arrival: '09:30'
    },
    stops: ['Zongolica', 'Tequila'],
    active: true
  },
  {
    origin: 'Tehuipango',
    destination: 'Orizaba',
    distance: 85,
    duration: 150,
    price: 60,
    schedule: {
      departure: '05:30',
      arrival: '08:00'
    },
    stops: ['Tequila', 'Zongolica'],
    active: true
  }
];

const initDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Limpiar colección existente
    await Route.deleteMany({});
    console.log('Colección de rutas limpiada');

    // Insertar rutas de ejemplo
    await Route.insertMany(sampleRoutes);
    console.log('Rutas de ejemplo insertadas');

    console.log('Base de datos inicializada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
};

initDb(); 