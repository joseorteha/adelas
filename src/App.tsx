import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RoutesPage from './pages/Routes'
import SearchResults from './pages/SearchResults'
import SeatSelection from './pages/SeatSelection'
import PassengerRegistration from './pages/PassengerRegistration'
import Confirmation from './pages/Confirmation'
import Payment from './pages/Payment'
import Tickets from './pages/Tickets'
import Shipping from './pages/Shipping'
import TrackShipment from './pages/TrackShipment'
import Contact from './pages/Contact'
import ViajesTuristicos from './pages/ViajesTuristicos'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

// Páginas de administración
import AdminDashboard from './pages/Admin/Dashboard'
import AdminLocations from './pages/Admin/Locations'
import AdminRoutes from './pages/Admin/Routes'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rutas" element={<RoutesPage />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/seat-selection" element={<SeatSelection />} />
            <Route path="/passenger-registration" element={<PassengerRegistration />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/envios" element={<Shipping />} />
            <Route path="/seguimiento" element={<TrackShipment />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/viajes-turisticos" element={<ViajesTuristicos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/seat-selection" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
            <Route path="/passenger-registration" element={<ProtectedRoute><PassengerRegistration /></ProtectedRoute>} />
            <Route path="/confirmation" element={<ProtectedRoute><Confirmation /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
            
            {/* Rutas de administración - Protegidas con requireAdmin=true */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/locations" element={<ProtectedRoute requireAdmin={true}><AdminLocations /></ProtectedRoute>} />
            <Route path="/admin/routes" element={<ProtectedRoute requireAdmin={true}><AdminRoutes /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App