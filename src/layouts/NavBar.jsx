// Navbar.js
import { CircleUserRound, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import MainLogo from "@src/assets/images/main-logo.png";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-black text-yellow flex items-center justify-between md:justify-around p-4">
        <div className="flex items-center space-x-4">
          <img src={MainLogo} alt="Logo" className="h-12" />
        </div>

        <div className="hidden md:flex md:space-x-8 font-bakbak tracking-wider">
          <a href="#produce" className="hover:text-gray-400">Produce</a>
          <a href="#tracking" className="hover:text-gray-400">Tracking</a>
          <a href="#about-us" className="hover:text-gray-400">About Us</a>
          <a href="#recommendations" className="hover:text-gray-400">Recommendations</a>
        </div>

        <div className="flex items-center space-x-4">
          <ShoppingCart className="h-6 cursor-pointer text-yellow"/>
          <CircleUserRound className="h-6 cursor-pointer text-yellow" />
          <button
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6 text-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        </div>

        
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black text-white transform transition-transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex flex-col items-center mt-16 font-bakbak">
          <a href="#produce" className="py-2 px-4 text-lg  hover:bg-gray-700">Produce</a>
          <a href="#tracking" className="py-2 px-4 text-lg  hover:bg-gray-700">Tracking</a>
          <a href="#about-us" className="py-2 px-4 text-lg  hover:bg-gray-700">About Us</a>
          <a href="#recommendations" className="py-2 px-4 text-lg  hover:bg-gray-700">Recommendations</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
