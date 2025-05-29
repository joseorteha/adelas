import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Location from '../models/location.model';
import Route from '../models/route.model';

// Cargar variables de entorno
dotenv.config();

// URL de conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adelas-transportes';

// Datos de ubicaciones
const locations = [
  { name: 'Orizaba', state: 'Veracruz', type: 'ciudad' },
  { name: 'Zongolica', state: 'Veracruz', type: 'ciudad' },
  { name: 'Cuautlamanca', state: 'Veracruz', type: 'pueblo' },
  { name: 'Zacamilola', state: 'Veracruz', type: 'pueblo' },
  { name: 'Xoxocotla', state: 'Veracruz', type: 'pueblo' },
  { name: 'Cumbre de Tequila', state: 'Veracruz', type: 'comunidad' }
];

// Función para generar rutas entre ubicaciones
const generateRoutes = (locations: any[]) => {
  const routes = [];
  
  // Para cada origen
  for (let i = 0; i < locations.length; i++) {
    // Para cada destino (evitando el mismo origen)
    for (let j = 0; j < locations.length; j++) {
      if (i !== j) { // No crear ruta de una ubicación a sí misma
        const distance = Math.floor(Math.random() * 100) + 10; // Entre 10 y 109 km
        const duration = Math.floor(distance * 1.5); // Duración en minutos, aproximadamente
        const price = Math.floor(distance * 0.5) + 30; // Precio basado en distancia
        
        // Agregar ruta ordinaria
        routes.push({
          origin: locations[i].name,
          destination: locations[j].name,
          distance,
          duration,
          price,
          schedule: {
            departure: `${Math.floor(Math.random() * 12) + 6}:${Math.random() > 0.5 ? '30' : '00'}`, // Entre 6:00 y 17:30
            arrival: `${Math.floor(Math.random() * 12) + 6}:${Math.random() > 0.5 ? '30' : '00'}` // Hora de llegada aproximada
          },
          stops: generateRandomStops(locations, locations[i].name, locations[j].name),
          active: true
        });
        
        // Para algunas rutas, agregar servicio rápido
        if (distance > 30) {
          routes.push({
            origin: locations[i].name,
            destination: locations[j].name,
            distance,
            duration: Math.floor(duration * 0.7), // 30% más rápido
            price: Math.floor(price * 1.2), // 20% más caro
            schedule: {
              departure: `${Math.floor(Math.random() * 12) + 6}:${Math.random() > 0.5 ? '30' : '00'}`,
              arrival: `${Math.floor(Math.random() * 12) + 6}:${Math.random() > 0.5 ? '30' : '00'}`
            },
            stops: [], // Sin paradas para servicio rápido
            active: true
          });
        }
      }
    }
  }
  
  return routes;
};

// Generar paradas aleatorias entre ubicaciones
const generateRandomStops = (allLocations: any[], origin: string, destination: string) => {
  const stops = [];
  const stopCount = Math.floor(Math.random() * 3); // 0 a 2 paradas
  
  const availableStops = allLocations
    .filter(loc => loc.name !== origin && loc.name !== destination)
    .map(loc => loc.name);
  
  for (let i = 0; i < stopCount && i < availableStops.length; i++) {
    const randomIndex = Math.floor(Math.random() * availableStops.length);
    stops.push(availableStops[randomIndex]);
    availableStops.splice(randomIndex, 1); // Evitar duplicados
  }
  
  return stops;
};

// Función principal para sembrar datos
const seedDatabase = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Conexión a MongoDB establecida para carga de datos iniciales');
    
    // Limpiar colecciones existentes
    await Location.deleteMany({});
    await Route.deleteMany({});
    console.log('Colecciones limpiadas');
    
    // Insertar ubicaciones
    const createdLocations = await Location.insertMany(locations);
    console.log(`${createdLocations.length} ubicaciones creadas`);
    
    // Generar e insertar rutas
    const routes = generateRoutes(locations);
    const createdRoutes = await Route.insertMany(routes);
    console.log(`${createdRoutes.length} rutas creadas`);
    
    console.log('Datos iniciales cargados correctamente');
  } catch (error) {
    console.error('Error al cargar datos iniciales:', error);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
    process.exit(0);
  }
};

// Ejecutar la función
seedDatabase();
