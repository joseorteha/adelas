import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Tipos para las respuestas de la API
interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface UserResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Clase de servicio de autenticación
class AuthService {
  // Método para iniciar sesión
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        // Guardar token y datos de usuario en localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userName', response.data.user.email);
        localStorage.setItem('userRole', response.data.user.role);
        
        // Notificar a otros componentes sobre el cambio en localStorage
        window.dispatchEvent(new Event('storage'));
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error en el inicio de sesión');
      }
      throw new Error('Error de conexión con el servidor');
    }
  }

  // Método para registrar un nuevo usuario
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
        name,
        email,
        password
      });
      
      if (response.data.success) {
        // Guardar token y datos de usuario en localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userName', response.data.user.email);
        localStorage.setItem('userRole', response.data.user.role);
        
        // Notificar a otros componentes sobre el cambio en localStorage
        window.dispatchEvent(new Event('storage'));
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error en el registro');
      }
      throw new Error('Error de conexión con el servidor');
    }
  }

  // Método para obtener el usuario actual
  async getCurrentUser(): Promise<UserResponse | null> {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    try {
      const response = await axios.get<UserResponse>(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      // Si hay un error (token inválido o expirado), limpiar localStorage
      this.logout();
      return null;
    }
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('pendingTrip');
    localStorage.removeItem('user');
    
    // Notificar a otros componentes sobre el cambio en localStorage
    window.dispatchEvent(new Event('storage'));
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
}

// Exportar una instancia del servicio
export default new AuthService();
