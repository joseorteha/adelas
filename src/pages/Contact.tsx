import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, Facebook, Twitter, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    // Resetear el formulario o mostrar un mensaje de confirmación
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1570125909664-eb6b0b533929?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">Contacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="mr-2 text-orange-500" />
                <span>+52 (272) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-orange-500" />
                <span>info@adelasbus.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 text-orange-500" />
                <span>Av. Principal 123, Orizaba, Veracruz, México</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 text-orange-500" />
                <span>Lunes a Domingo: 6:00 AM - 10:00 PM</span>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Síguenos en redes sociales</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800"><Facebook /></a>
                <a href="#" className="text-blue-400 hover:text-blue-600"><Twitter /></a>
                <a href="#" className="text-pink-600 hover:text-pink-800"><Instagram /></a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Asunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" />
                Enviar mensaje
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">¿Cómo puedo comprar boletos en línea?</h3>
              <p>Puede comprar boletos en línea a través de nuestro sitio web. Simplemente seleccione su ruta, fecha y asientos, y siga las instrucciones para completar su compra.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">¿Cuál es la política de equipaje?</h3>
              <p>Cada pasajero tiene derecho a una maleta de mano y una maleta documentada de hasta 25 kg. Cargos adicionales pueden aplicar para equipaje extra o de mayor peso.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">¿Ofrecen descuentos para estudiantes o personas de la tercera edad?</h3>
              <p>Sí, ofrecemos descuentos para estudiantes y personas de la tercera edad. Por favor, presente una identificación válida al momento de comprar su boleto o abordar el autobús.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">¿Cómo puedo hacer un cambio en mi reservación?</h3>
              <p>Para cambios en su reservación, por favor contáctenos por teléfono o visite una de nuestras oficinas con al menos 24 horas de anticipación a su viaje.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact