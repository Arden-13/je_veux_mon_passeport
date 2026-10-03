import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { EnrollmentProvider } from './context/EnrollmentContext'
import Home from './pages/Home'
import Informations from './pages/Informations'
import Centres from './pages/Centres'
import Faq from './pages/Faq'
import Auth from './pages/Auth'
import RequestType from './pages/RequestType'
import Enrollment from './pages/Enrollment'
import Confirmation from './pages/Confirmation'
import Tracking from './pages/Tracking'
import AgentDashboard from './pages/agent/AgentDashboard'
import AgentFile from './pages/agent/AgentFile'

export default function App() {
  return (
    <BrowserRouter>
      <EnrollmentProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/informations" element={<Informations />} />
            <Route path="/centres" element={<Centres />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/inscription" element={<Auth />} />
            <Route path="/demande/type" element={<RequestType />} />
            <Route path="/demande/:etape" element={<Enrollment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/suivi" element={<Tracking />} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/agent/dossiers/:id" element={<AgentFile />} />
          </Routes>
        </main>
        <Footer />
      </EnrollmentProvider>
    </BrowserRouter>
  )
}
