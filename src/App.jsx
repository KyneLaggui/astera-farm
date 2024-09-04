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
      <Route index path="/checkout" element={<Pages.Checkout />} />
      <Route index path="/tracking" element={<Pages.Tracking />} />
      <Route index path="/about-us" element={<Pages.AboutUs />} />
      <Route index path="/recommendations" element={<Pages.Recommendations />} />
      <Route path="admin">
        <Route path="products" element={<Pages.AdminProducts />} />
      </Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App
