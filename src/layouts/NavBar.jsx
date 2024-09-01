import { CircleMinus, CircleUserRound, CircleX, LogOut, Minus, Plus, ShoppingCart, UserPen } from 'lucide-react';
import { useState } from 'react';
import MainLogo from "@src/assets/images/main-logo.png";

import { supabase } from "@src/supabase/config";
import { signOut } from '@src/supabase/actions';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectIsLoggedIn } from '@src/redux/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu"
import { DropdownMenuGroup, DropdownMenuItem } from '@src/components/ui/dropdown-menu';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
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
import EditProfileDialog from '@src/components/navbar/EditProfileDialog';
import { useEffect } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@src/components/ui/sheet';
import { Button } from '@src/components/ui/button';
import CartProducts from '@src/components/order-components/CartProducts';
import { ScrollArea } from '@src/components/ui/scroll-area';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isLoggedInRedux = useSelector(selectIsLoggedIn);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const dispatch = useDispatch()

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    // This for listening to supabase auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
          dispatch(
              SET_ACTIVE_USER({
                  email: session.user.email,
                  userId: session.user.id,                 
              })
          );
                                      
      } else {
          dispatch(REMOVE_ACTIVE_USER());
      }
   })
  }, [dispatch])

  useEffect(() => {
    setIsLoggedIn(isLoggedInRedux)
  }, [isLoggedInRedux])

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-black text-yellow flex items-center justify-between md:justify-around p-4 fixed top-0 left-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <img src={MainLogo} alt="Logo" className="h-12" />
        </div>

        <div className="hidden md:flex md:space-x-8 font-bakbak text-lg tracking-wider">
          <a href="#produce" className="hover:text-white">Produce</a>
          <a href="#tracking" className="hover:text-white">Tracking</a>
          <a href="#about-us" className="hover:text-white">About Us</a>
          <a href="#recommendations" className="hover:text-white">Recommendations</a>
        </div>

        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingCart className="h-6 cursor-pointer text-yellow"/>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <SheetHeader>
                <SheetTitle>Add to Cart</SheetTitle>
                <SheetDescription>
                  Add items to your cart with a click and review them before checkout.
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-full">
                <div className='flex flex-col gap-2'>
                  <CartProducts />
                  <CartProducts />   
                  <CartProducts />   
                  <CartProducts />   
                  <CartProducts />   
                </div>
                           
              </ScrollArea>          
              <SheetFooter className="border-t pt-4">
                <h1 className='text min-w-[100px] text-md font-medium'>Total Price <span className='text-yellow'>₱10,400</span></h1>
                <SheetClose asChild>
                  <Button type="submit" className="w-full">Checkout</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          

          {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CircleUserRound className="h-6 cursor-pointer text-yellow" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 ">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup >
                    <DropdownMenuItem onClick={handleDialogOpen}>
                      <UserPen className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center" onClick={signOut}>
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

      {/* Edit Profile Dialog */}
      <EditProfileDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
    </div>
  );
};

export default Navbar;