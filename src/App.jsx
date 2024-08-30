import { Route, Routes } from 'react-router-dom'
import './index.css'
import Pages from '@src/pages/pages'
import Navbar from './layouts/NavBar'

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route index path="*" element={<Pages.NotFound />} />      
      <Route index path="/" element={<Pages.LandingPage />} />
      <Route index path="/produce" element={<Pages.Produce />} />
      <Route index path="/test" element={<Pages.TestPage />} />
      <Route path="admin">
        <Route path="products" element={<Pages.AdminProducts />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
