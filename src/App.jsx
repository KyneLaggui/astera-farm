import { Route, Routes } from 'react-router-dom'
import './App.css'

import Pages from '@src/pages/pages'

function App() {
  return (
    <Routes>
      <Route index path="*" element={<Pages.NotFound />} />
      <Route index path="/" element={<Pages.LandingPage />} />
    </Routes>
  )
}

export default App
