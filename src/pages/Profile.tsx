import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Calendar, MapPin, Save, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'

// Definir la interfaz directamente aquí para evitar conflictos
interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate()
  // Inicializar el estado con valores por defecto
  const [userData, setUserData] = useState<UserProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: '',
    address: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  // Cargar datos del usuario solo al montar el componente
  useEffect(() => {
    // Obtener nombre de usuario o email almacenado
    const userName = localStorage.getItem('userName')
    
    // Intentar cargar datos existentes del usuario
    const storedUser = localStorage.getItem('user')
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserData(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        // Si hay error de parsing, usar datos default con nombre de usuario
        if (userName) {
          setUserData({
            ...userData,
            firstName: userName,
            email: userName.includes('@') ? userName : `${userName}@example.com`
          })
        }
      }
    } else if (userName) {
      // Si no hay datos guardados pero sí hay nombre de usuario
      setUserData({
        ...userData,
        firstName: userName,
        email: userName.includes('@') ? userName : `${userName}@example.com`
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Solo ejecutar al montar el componente

  const handleLogout = () => {
    // Eliminar todos los tokens y datos de sesión
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    localStorage.removeItem('pendingTrip')
    
    // Crear un evento de storage para notificar a otros componentes
    window.dispatchEvent(new Event('storage'))
    
    // Redirigir a la página de inicio
    navigate('/')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Guardar los datos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Actualizar el nombre de usuario si cambió
    if (userData.email) {
      localStorage.setItem('userName', userData.email)
    }
    
    // Desactivar el modo de edición
    setIsEditing(false)
    
    // Mostrar mensaje de éxito (opcional)
    alert('Perfil actualizado con éxito')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full m-4 p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center"
          >
            <LogOut className="mr-2" size={18} />
            Cerrar sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Apellido</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="birthdate"
                  value={userData.birthdate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center"
            >
              <Save className="mr-2" size={18} />
              Guardar cambios
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Editar perfil
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Profile