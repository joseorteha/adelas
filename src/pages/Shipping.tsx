import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Package, Shield, Truck, Clock, DollarSign, AlertTriangle, Eye, Users, Lock, Box, MapPin, FileText, Receipt, Search, CheckCircle, Zap, Smile, Download, Calendar, User, Phone, Mail } from 'lucide-react'
import { generateShippingGuide } from '../utils/shippingUtils'
import ShippingLabel from '../components/ShippingLabel'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Shipping: React.FC = () => {
  const [shippingInfo, setShippingInfo] = useState({
    origin: '',
    destination: '',
    date: '',
    weight: '',
    sender: {
      name: '',
      phone: '',
      email: '',
    },
    recipient: {
      name: '',
      phone: '',
      email: '',
    },
  })
  const [shippingGuide, setShippingGuide] = useState<any>(null)
  const shippingLabelRef = useRef<HTMLDivElement>(null)

  const locations = ['Orizaba', 'Zongolica', 'Cuautlamanca', 'Zacamilola', 'Xoxocotla', 'Tehuipango', 'Cumbre de Tequila']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setShippingInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setShippingInfo(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const guide = generateShippingGuide(shippingInfo)
    setShippingGuide(guide)
  }

  const handlePrintLabel = () => {
    if (shippingLabelRef.current) {
      html2canvas(shippingLabelRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('shipping_label.pdf')
      })
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-orange-500">Envíos con Adelas</h1>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir Adelas para tus envíos?</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Truck className="mr-2 text-green-500" />
              <span>Amplia cobertura en la región</span>
            </li>
            <li className="flex items-center">
              <Clock className="mr-2 text-green-500" />
              <span>Entregas rápidas y puntuales</span>
            </li>
            <li className="flex items-center">
              <Shield className="mr-2 text-green-500" />
              <span>Seguridad garantizada para tus paquetes</span>
            </li>
            <li className="flex items-center">
              <DollarSign className="mr-2 text-green-500" />
              <span>Precios competitivos y transparentes</span>
            </li>
            <li className="flex items-center">
              <Users className="mr-2 text-green-500" />
              <span>Atención al cliente personalizada</span>
            </li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Seguridad en tus envíos</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Lock className="mr-2 text-green-500" />
              <span>Seguimiento en tiempo real de tus paquetes</span>
            </li>
            <li className="flex items-center">
              <Eye className="mr-2 text-green-500" />
              <span>Monitoreo constante durante el transporte</span>
            </li>
            <li className="flex items-center">
              <Box className="mr-2 text-green-500" />
              <span>Embalaje seguro para proteger tus envíos</span>
            </li>
            <li className="flex items-center">
              <Shield className="mr-2 text-green-500" />
              <span>Seguro de envío incluido en todos los paquetes</span>
            </li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Genera tu guía de envío</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origen</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    id="origin"
                    name="origin"
                    value={shippingInfo.origin}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    required
                  >
                    <option value="">Selecciona el origen</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    id="destination"
                    name="destination"
                    value={shippingInfo.destination}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    required
                  >
                    <option value="">Selecciona el destino</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha de envío</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={shippingInfo.date}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={shippingInfo.weight}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Datos del remitente</h3>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="sender.name"
                      value={shippingInfo.sender.name}
                      onChange={handleInputChange}
                      placeholder="Nombre"
                      className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="sender.phone"
                      value={shippingInfo.sender.phone}
                      onChange={handleInputChange}
                      placeholder="Teléfono"
                      className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="sender.email"
                      value={shippingInfo.sender.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
                      className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Datos del destinatario</h3>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="recipient.name"
                      value={shippingInfo.recipient.name}
                      onChange={handleInputChange}
                      placeholder="Nombre"
                      className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="recipient.phone"
                      value={shippingInfo.recipient.phone}
                      onChange={handleInputChange}
                      placeholder="Teléfono"
                      className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="recipient.email"
                      value={shippingInfo.recipient.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
                      className="pl-10 w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center"
            >
              <FileText className="mr-2" />
              Generar Guía de Envío
            </button>
          </form>
        </motion.section>

        {shippingGuide && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Tu Guía de Envío</h2>
            <div ref={shippingLabelRef}>
              <ShippingLabel guide={shippingGuide} />
            </div>
            <button
              onClick={handlePrintLabel}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            >
              <Download className="mr-2" />
              Descargar Etiqueta de Envío (PDF)
            </button>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Pasos para enviar tu paquete</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li className="flex items-center">
              <span className="mr-2">1.</span>
              <FileText className="mr-2 text-orange-500" />
              <span>Completa el formulario con los datos del envío</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">2.</span>
              <Receipt className="mr-2 text-orange-500" />
              <span>Genera tu guía de envío</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">3.</span>
              <Truck className="mr-2 text-orange-500" />
              <span>Lleva tu paquete a la oficina de Adelas más cercana</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">4.</span>
              <Search className="mr-2 text-orange-500" />
              <span>Realiza el seguimiento de tu envío con el número de guía</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">5.</span>
              <CheckCircle className="mr-2 text-orange-500" />
              <span>¡Tu paquete será entregado en el destino!</span>
            </li>
          </ol>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Información Importante</h2>
          <div className="flex items-start">
            <AlertTriangle className="mr-2 text-yellow-500 flex-shrink-0 mt-1" />
            <p>
              Por razones de seguridad y regulaciones, no se pueden enviar artículos prohibidos o restringidos.
              Consulta nuestra lista de artículos permitidos antes de realizar tu envío.
              <a href="#" className="text-blue-500 hover:underline ml-1">
                Ver lista de artículos permitidos
              </a>
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Shipping