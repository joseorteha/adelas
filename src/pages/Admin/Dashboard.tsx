import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Route as RouteIcon, Bus, Ticket, Package, User, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const modules = [
    { 
      title: 'Ubicaciones', 
      icon: <MapPin size={24} className="text-blue-500" />, 
      description: 'Administrar ciudades, pueblos y comunidades', 
      path: '/admin/locations' 
    },
    { 
      title: 'Rutas', 
      icon: <RouteIcon size={24} className="text-green-500" />, 
      description: 'Configurar rutas, horarios y precios', 
      path: '/admin/routes' 
    },
    { 
      title: 'Autobuses', 
      icon: <Bus size={24} className="text-orange-500" />, 
      description: 'Gestionar flota de autobuses', 
      path: '/admin/buses' 
    },
    { 
      title: 'Boletos', 
      icon: <Ticket size={24} className="text-purple-500" />, 
      description: 'Ver y administrar boletos vendidos', 
      path: '/admin/tickets' 
    },
    { 
      title: 'Envíos', 
      icon: <Package size={24} className="text-red-500" />, 
      description: 'Gestionar envíos y paquetería', 
      path: '/admin/shipments' 
    },
    { 
      title: 'Usuarios', 
      icon: <User size={24} className="text-indigo-500" />, 
      description: 'Administrar cuentas de usuarios', 
      path: '/admin/users' 
    },
    { 
      title: 'Configuración', 
      icon: <Settings size={24} className="text-gray-500" />, 
      description: 'Configurar parámetros del sistema', 
      path: '/admin/settings' 
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-gray-600 mb-4">
          Bienvenido al panel de administración de Adelas Transportes. Aquí puedes gestionar todos los aspectos de la aplicación.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Link
            key={index}
            to={module.path}
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              {module.icon}
              <h2 className="text-xl font-semibold ml-3">{module.title}</h2>
            </div>
            <p className="text-gray-600">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
