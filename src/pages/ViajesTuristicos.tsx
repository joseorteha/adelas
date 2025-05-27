import React, { useState } from 'react'
import { MapPin, Calendar, Users, DollarSign, Send } from 'lucide-react'

const ViajesTuristicos: React.FC = () => {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    passengers: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar la solicitud de viaje personalizado
    console.log('Solicitud de viaje enviada:', formData)
    // Resetear el formulario o mostrar un mensaje de confirmación
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Viajes Turísticos Personalizados</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Diseña tu viaje ideal</h2>
          <p className="mb-4">En Adelas, nos especializamos en crear experiencias de viaje únicas y personalizadas. Ya sea que estés planeando una escapada de fin de semana o unas vacaciones más largas, estamos aquí para ayudarte a diseñar el viaje perfecto.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino deseado</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="¿A dónde te gustaría ir?"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha aproximada</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Número de pasajeros</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="passengers"
                  id="passengers"
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="¿Cuántas personas viajarán?"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Presupuesto aproximado</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="budget"
                  id="budget"
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="¿Cuál es tu presupuesto?"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono de contacto</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Send className="mr-2 h-5 w-5" />
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué elegir nuestros viajes turísticos?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Itinerarios personalizados según tus preferencias</li>
            <li>Guías locales expertos y amigables</li>
            <li>Experiencias únicas y auténticas</li>
            <li>Alojamientos cuidadosamente seleccionados</li>
            <li>Transporte cómodo y seguro</li>
            <li>Atención al cliente 24/7 durante tu viaje</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ViajesTuristicos