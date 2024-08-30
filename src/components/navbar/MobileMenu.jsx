import React from 'react';

const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div
      className={`z-10 fixed inset-0 bg-black text-yellow transform transition-transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
    >
      <button
        className="absolute top-4 right-4 text-yellow"
        onClick={toggleMobileMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div className="flex flex-col items-center mt-16 font-bakbak">
        <a href="#produce" className="py-2 px-4 text-lg">Produce</a>
        <a href="#tracking" className="py-2 px-4 text-lg">Tracking</a>
        <a href="#about-us" className="py-2 px-4 text-lg">About Us</a>
        <a href="#recommendations" className="py-2 px-4 text-lg">Recommendations</a>
      </div>
    </div>
  );
};

export default MobileMenu;