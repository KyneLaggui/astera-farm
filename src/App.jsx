import { Route, Routes } from 'react-router-dom'
import './index.css'
import Pages from '@src/pages/pages'
import Navbar from '@src/layouts/NavBar'
import Footer from '@src/layouts/Footer'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route index path="*" element={<Pages.NotFound />} />      
      <Route index path="/" element={<Pages.LandingPage />} />
      <Route index path="/produce" element={<Pages.Produce />} />
      <Route index path="/test" element={<Pages.TestPage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
