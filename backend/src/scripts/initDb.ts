import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Route from '../models/route.model';
import User from '../models/user.model';
import Bus from '../models/bus.model';
import Ticket from '../models/ticket.model';
import bcrypt from 'bcryptjs';

dotenv.config();

// Conexión a la base de datos "test" en MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

const sampleRoutes = [
  {
    origin: 'Zongolica',
    destination: 'Orizaba',
    distance: 45,
    duration: 90,
    price: 40,
    serviceType: 'Ordinario',
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
    duration: 75,
    price: 45,
    serviceType: 'Rápido',
    schedule: {
      departure: '05:30',
      arrival: '06:45'
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
    serviceType: 'Ordinario',
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
    duration: 135,
    price: 65,
    serviceType: 'Rápido',
    schedule: {
      departure: '05:30',
      arrival: '07:45'
    },
    stops: ['Tequila', 'Zongolica'],
    active: true
  },
  {
    origin: 'Zongolica',
    destination: 'Orizaba',
    distance: 45,
    duration: 60,
    price: 50,
    serviceType: 'Directo',
    schedule: {
      departure: '08:00',
      arrival: '09:00'
    },
    stops: [],
    active: true
  }
];

// Usuarios de prueba para la aplicación
const sampleUsers = [
  {
    name: 'Administrador',
    email: 'admin@adelas.com',
    password: 'Adelas2024!',
    role: 'admin'
  },
  {
    name: 'Usuario Demo',
    email: 'usuario@adelas.com',
    password: 'usuario123',
    role: 'user'
  }
];

// Datos de ejemplo para buses
const sampleBuses = [
  {
    plate: 'ADL-001',
    busModel: 'Mercedes Benz Marco Polo 2020',
    capacity: 42,
    type: 'Ejecutivo',
    features: ['WiFi', 'Aire Acondicionado', 'Baño', 'TV'],
    active: true
  },
  {
    plate: 'ADL-002',
    busModel: 'Volvo 9700 2019',
    capacity: 48,
    type: 'Ordinario',
    features: ['Aire Acondicionado'],
    active: true
  },
  {
    plate: 'ADL-003',
    busModel: 'Irizar i8 2021',
    capacity: 36,
    type: 'Directo',
    features: ['WiFi', 'Aire Acondicionado', 'Baño', 'TV', 'Asientos reclinables', 'Tomas de corriente'],
    active: true
  }
];

const initDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB Test');

    // Limpiar colecciones existentes
    await Route.deleteMany({});
    console.log('Colección de rutas limpiada');
    
    await User.deleteMany({});
    console.log('Colección de usuarios limpiada');
    
    await Bus.deleteMany({});
    console.log('Colección de buses limpiada');
    
    await Ticket.deleteMany({});
    console.log('Colección de tickets limpiada');

    // Insertar rutas de ejemplo
    const insertedRoutes = await Route.insertMany(sampleRoutes);
    console.log('Rutas de ejemplo insertadas');
    
    // Insertar usuarios de prueba
    const insertedUsers = [];
    for (const user of sampleUsers) {
      // Hashear la contraseña manualmente para el script
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      const newUser = await User.create({
        ...user,
        password: hashedPassword
      });
      insertedUsers.push(newUser);
    }
    console.log('Usuarios de prueba insertados');
    
    // Insertar buses de ejemplo
    const insertedBuses = await Bus.insertMany(sampleBuses);
    console.log('Buses de ejemplo insertados');
    
    // Crear algunos boletos de ejemplo
    if (insertedRoutes.length > 0 && insertedUsers.length > 0 && insertedBuses.length > 0) {
      // Crear fecha para hoy y mañana
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Crear boletos de ejemplo
      const exampleTickets = [
        {
          userId: insertedUsers[1]._id, // Usuario normal
          routeId: insertedRoutes[0]._id, // Primera ruta
          busId: insertedBuses[0]._id, // Primer bus
          seatNumber: 5,
          departureDate: tomorrow,
          arrivalDate: new Date(tomorrow.getTime() + 90 * 60000), // 90 minutos después
          status: 'pagado',
          paymentMethod: 'tarjeta',
          price: 40,
          discount: 0,
          finalPrice: 40
        },
        {
          userId: insertedUsers[1]._id, // Usuario normal
          routeId: insertedRoutes[2]._id, // Tercera ruta
          busId: insertedBuses[2]._id, // Tercer bus
          seatNumber: 10,
          departureDate: new Date(tomorrow.getTime() + 24 * 3600000), // Pasado mañana
          arrivalDate: new Date(tomorrow.getTime() + 24 * 3600000 + 150 * 60000), // 150 minutos después
          status: 'reservado',
          paymentMethod: 'pendiente',
          price: 60,
          discount: 5,
          finalPrice: 55
        }
      ];
      
      await Ticket.insertMany(exampleTickets);
      console.log('Boletos de ejemplo insertados');
    }

    console.log('Base de datos inicializada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
};

initDb(); 