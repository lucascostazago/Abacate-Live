import { Routes, Route } from 'react-router-dom'
import PaymentPage from './pages/payment.tsx'
import ConfigPage from './pages/config.tsx'
import AlertPage from './pages/alert.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaymentPage />} />
      <Route path="/config" element={<ConfigPage />} />
      <Route path="/alert" element={<AlertPage />} />
    </Routes>
  )
}

export default App
