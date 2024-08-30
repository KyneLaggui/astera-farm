import { CircleUserRound, LogOut, ShoppingCart, UserPen } from 'lucide-react';
import { useState } from 'react';
import MainLogo from "@src/assets/images/main-logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
import { DropdownMenuGroup, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@src/components/ui/dialog"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@src/components/ui/tabs"

import LoginForm from '@src/components/navbar/LoginForm';
import SignUpForm from '@src/components/navbar/SignUpForm';
import MobileMenu from '@src/components/navbar/MobileMenu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-black text-yellow flex items-center justify-between md:justify-around p-4 fixed top-0 left-0 w-full z-50">
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

          {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CircleUserRound className="h-6 cursor-pointer text-yellow" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="flex flex-col gap-2">
                    <DropdownMenuItem className="flex items-center">
                      <UserPen className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <CircleUserRound className="h-6 cursor-pointer text-yellow" />
                </DialogTrigger>
                <DialogContent className="w-[400px]">
                  <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2 mt-4">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">SignUp</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <LoginForm />
                    </TabsContent>
                    <TabsContent value="signup">
                      <SignUpForm />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          
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
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
    </div>
  );
};

export default Navbar;