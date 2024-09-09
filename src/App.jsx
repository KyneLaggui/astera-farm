import { Route, Routes } from 'react-router-dom'
import './index.css'
import Pages from '@src/pages/pages'
import Navbar from '@src/layouts/NavBar'
import Footer from '@src/layouts/Footer'

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className="flex-grow">
        <Navbar />
        <Routes>
          <Route index path="*" element={<Pages.NotFound />} />      
          <Route index path="/" element={<Pages.LandingPage />} />
          <Route index path="/produce" element={<Pages.Produce />} />
          <Route index path="/test" element={<Pages.TestPage />} />
          <Route index path="/checkout" element={<Pages.Checkout />} />
          <Route index path="/checkout-paymongo" element={<Pages.CheckoutPayMongo />} />
          <Route index path="/tracking" element={<Pages.Tracking />} />
          <Route index path="/about-us" element={<Pages.AboutUs />} />
          <Route path="/recommendations" element={<Pages.Recommendations />} />
          <Route path="/recommendations/health" element={<Pages.Health />} />
          <Route path="/recommendations/recipes" element={<Pages.Recipes />} />
          <Route path="/recommendations/call-us" element={<Pages.CallUs />} />
          <Route path="/checkout-success" element={<Pages.Success />} />
          <Route path="admin">
            <Route path="products" element={<Pages.AdminProducts />} />
          </Route>
        </Routes>
      </div>    
      <Footer />
    </div>
  )
}

export default App
