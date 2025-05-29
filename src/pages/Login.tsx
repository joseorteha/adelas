import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Bus } from 'lucide-react'
import { motion } from 'framer-motion'
import authService from '../services/auth.service'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  
  // Extraer el parámetro de redirección de la URL si existe
  useEffect(() => {
    // Si ya hay un token de autenticación, redirigir al usuario
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      const redirectPath = new URLSearchParams(location.search).get('redirect')
      navigate(redirectPath ? `/${redirectPath}` : '/profile')
    }
  }, [location, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Mostrar indicador de carga
    const loadingElement = document.createElement('div')
    loadingElement.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    loadingElement.innerHTML = '<div class="bg-white p-5 rounded-lg shadow-lg"><p class="text-center">Iniciando sesión...</p></div>'
    document.body.appendChild(loadingElement)
    
    try {
      // Llamar al servicio de autenticación real
      const response = await authService.login(formData.email, formData.password)
      
      // Si la autenticación fue exitosa
      if (response.success) {
        // Verificar rol y redireccionar
        if (response.user.role === 'admin') {
          navigate('/admin')
          return
        }
        
        // Para usuarios normales, verificar si hay una redirección pendiente
        const redirectPath = new URLSearchParams(location.search).get('redirect')
        const pendingTrip = localStorage.getItem('pendingTrip')
        
        if (redirectPath && pendingTrip) {
          // Si hay un viaje pendiente, procesarlo
          localStorage.setItem('selectedTrip', pendingTrip)
          localStorage.removeItem('pendingTrip')
          navigate(`/${redirectPath}`)
        } else if (redirectPath) {
          // Si solo hay redirección sin viaje pendiente
          navigate(`/${redirectPath}`)
        } else {
          // Redirección predeterminada
          navigate('/profile')
        }
      }
    } catch (error: any) {
      console.error('Error en inicio de sesión:', error)
      setError(error.message || 'Error en el inicio de sesión')
    } finally {
      // Remover indicador de carga
      document.body.removeChild(loadingElement)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center justify-center mb-4"
          >
            <Bus className="h-16 w-16 text-orange-500 mr-2" />
            <h2 className="text-4xl font-extrabold text-gray-900">Adelas</h2>
          </motion.div>
          <p className="text-sm text-gray-600">Autobuses De la Sierra</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-4">Iniciar Sesión</h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Escribe la contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              INICIAR SESIÓN
            </motion.button>
          </div>
        </form>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                ¿Deseas registrarte?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/register"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Hazlo aquí
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login