import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { EnrollmentProvider } from './context/EnrollmentContext'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Informations from './pages/Informations'
import Centres from './pages/Centres'
import Faq from './pages/Faq'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import RequestType from './pages/RequestType'
import Enrollment from './pages/Enrollment'
import Confirmation from './pages/Confirmation'
import Tracking from './pages/Tracking'
import AgentDashboard from './pages/agent/AgentDashboard'
import AgentFile from './pages/agent/AgentFile'
import EmailConfirmed from './pages/EmailConfirmed'

function RequireAuth({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="container page" role="status">Chargement...</div>
  }

  return user ? children : <Navigate to="/connexion" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <EnrollmentProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/email-confirme" element={<EmailConfirmed />} />
            <Route path="/" element={<Home />} />
            <Route path="/informations" element={<Informations />} />
            <Route path="/centres" element={<Centres />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<SignUp />} />
            <Route path="/demande/type" element={<RequireAuth><RequestType /></RequireAuth>} />
            <Route path="/demande/:etape" element={<RequireAuth><Enrollment /></RequireAuth>} />
            <Route path="/confirmation" element={<RequireAuth><Confirmation /></RequireAuth>} />
            <Route path="/suivi" element={<RequireAuth><Tracking /></RequireAuth>} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/agent/dossiers/:id" element={<AgentFile />} />
          </Routes>
        </main>
        <Footer />
      </EnrollmentProvider>
    </BrowserRouter>
  )
}