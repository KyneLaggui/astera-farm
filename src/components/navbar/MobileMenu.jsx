import React from "react";
import LoggedInOnlyComponent from "@src/layouts/component-restriction/LoggedInOnlyComponent";
import UserGuestOnlyComponent from '@src/layouts/component-restriction/UserGuestOnlyComponent';

const MobileMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div
      className={`z-30 fixed inset-0 bg-black text-yellow transform transition-transform ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden`}
    >
      <button
        className="absolute top-4 right-4 text-yellow"
        onClick={toggleMobileMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <div className="flex flex-col items-center gap-4 mt-24 font-bakbak py-2 px-4 text-lg sm:text-xl">
        <LoggedInOnlyComponent forAdmin={false} forUser={true}>
          <a href="/produce">Produce</a>
        </LoggedInOnlyComponent>
        <LoggedInOnlyComponent forAdmin={false} forUser={true}>
          <a href="/tracking">Tracking</a>
        </LoggedInOnlyComponent>
        <UserGuestOnlyComponent>
          <a href="/about-us">About Us</a>
        </UserGuestOnlyComponent>
        <UserGuestOnlyComponent>
          <a href="/recommendations">Recommendations</a>
        </UserGuestOnlyComponent>
        <LoggedInOnlyComponent forAdmin={true} forUser={false}>
          <a href="/admin/dashboard">Dashboard</a>
        </LoggedInOnlyComponent>
        <LoggedInOnlyComponent forAdmin={true} forUser={false}>
          <a href="/admin/products">Products</a>
        </LoggedInOnlyComponent>
        <LoggedInOnlyComponent forAdmin={true} forUser={false}>
          <a href="/admin/orders">Orders</a>
        </LoggedInOnlyComponent>
      </div>
    </div>
  );
};

export default MobileMenu;
