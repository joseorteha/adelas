import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bus, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Verificar si el usuario está autenticado usando el nuevo sistema de tokens
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem('authToken')
      setIsLoggedIn(!!authToken)
    }
    
    // Verificar al montar el componente y cuando cambie la ubicación
    checkAuthStatus()
    
    // Agregar un event listener para localStorage changes
    const handleStorageChange = () => {
      checkAuthStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const getHeaderClass = () => {
    if (isHomePage) {
      return isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }
    return 'bg-orange-500'
  }

  const getLinkClass = () => {
    if (isHomePage) {
      return isScrolled ? 'text-gray-600 hover:text-orange-500' : 'text-white hover:text-orange-300'
    }
    return 'text-white hover:text-orange-200'
  }

  const handleLogout = () => {
    // Eliminar todos los tokens y datos de sesión
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    localStorage.removeItem('pendingTrip')
    
    // Actualizar el estado
    setIsLoggedIn(false)
    
    // Crear un evento de storage para notificar a otros componentes
    window.dispatchEvent(new Event('storage'))
    
    // Redirigir a la página de inicio
    navigate('/')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const menuItems = [
    { to: '/', label: 'Inicio' },
    { to: '/rutas', label: 'Rutas' },
    { to: '/envios', label: 'Envíos' },
    { to: '/seguimiento', label: 'Seguimiento' },
    { to: '/viajes-turisticos', label: 'Viajes Turísticos' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderClass()}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Bus className={`w-8 h-8 ${isHomePage && !isScrolled ? 'text-white' : 'text-orange-500'}`} />
          <span className={`text-2xl font-bold ${isHomePage && !isScrolled ? 'text-white' : 'text-orange-500'}`}>Adelas</span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            {menuItems.map((item) => (
              <motion.li key={item.to} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to={item.to} className={`transition-colors duration-300 ${getLinkClass()}`}>{item.label}</Link>
              </motion.li>
            ))}
            {isLoggedIn ? (
              <>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link to="/profile" className={`transition-colors duration-300 ${getLinkClass()}`}>
                    <User className="w-5 h-5" />
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <button onClick={handleLogout} className={`transition-colors duration-300 ${getLinkClass()}`}>
                    Cerrar sesión
                  </button>
                </motion.li>
              </>
            ) : (
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/login" className={`transition-colors duration-300 ${getLinkClass()}`}>Iniciar sesión</Link>
              </motion.li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-orange-500"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block text-gray-800 hover:text-orange-500 transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="block text-gray-800 hover:text-orange-500 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="block w-full text-left text-gray-800 hover:text-orange-500 transition-colors duration-300"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="block text-gray-800 hover:text-orange-500 transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header