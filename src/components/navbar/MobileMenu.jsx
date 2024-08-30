import React from 'react';

const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
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
        <a href="#produce" className="py-2 px-4 text-lg hover:bg-gray-700">Produce</a>
        <a href="#tracking" className="py-2 px-4 text-lg hover:bg-gray-700">Tracking</a>
        <a href="#about-us" className="py-2 px-4 text-lg hover:bg-gray-700">About Us</a>
        <a href="#recommendations" className="py-2 px-4 text-lg hover:bg-gray-700">Recommendations</a>
      </div>
    </div>
  );
};

export default MobileMenu;