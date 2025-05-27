import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error de respuesta:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('Error de conexión:', error.request);
      return Promise.reject({
        message: 'No se pudo conectar con el servidor. Por favor, intente más tarde.'
      });
    } else {
      // Algo sucedió al configurar la petición
      console.error('Error:', error.message);
      return Promise.reject({
        message: 'Ocurrió un error inesperado. Por favor, intente más tarde.'
      });
    }
  }
);

export default api; 