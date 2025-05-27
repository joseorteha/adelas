import React from 'react'
import { Facebook, Github, Phone, Share2 } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Adelas</h3>
            <p>Viaja con comodidad y seguridad por todo México.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Enlaces rápidos</h4>
            <ul>
              <li><a href="/routes" className="hover:text-blue-300">Rutas</a></li>
              <li><a href="/shipping" className="hover:text-blue-300">Envíos</a></li>
              <li><a href="/contact" className="hover:text-blue-300">Contacto</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/joseorteha" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <Github />
              </a>
              <a href="https://www.facebook.com/joseortega.exe1" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <Facebook />
              </a>
              <a href="https://wa.me/+523311111111" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <Phone />
              </a>
              <a href="https://www.tiktok.com/@code_mastertik" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                <Share2 />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 José Ortega. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer