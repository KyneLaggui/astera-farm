import { Route, Routes } from 'react-router-dom'
import './index.css'
import Pages from '@src/pages/pages'

function App() {
  return (
    <Routes>
      <Route index path="*" element={<Pages.NotFound />} />
      <Route index path="/" element={<Pages.LandingPage />} />
      <Route index path="/produce" element={<Pages.Produce />} />
      <Route index path="/test" element={<Pages.TestPage />} />
    </Routes>
  )
}

export default App
