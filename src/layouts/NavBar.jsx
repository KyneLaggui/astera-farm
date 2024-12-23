import {
  CircleMinus,
  CircleUserRound,
  CircleX,
  LogOut,
  Minus,
  Plus,
  ShoppingCart,
  UserPen,
} from "lucide-react";
import { useState, useEffect } from "react";
import MainLogo from "@src/assets/images/main-logo.png";

import { supabase } from "@src/supabase/config";
import { signOut } from "@src/supabase/actions";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
  selectIsAdmin,
  selectIsLoggedIn,
} from "@src/redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LoggedInOnlyComponent from "@src/layouts/component-restriction/LoggedInOnlyComponent";
import UserGuestOnlyComponent from "@src/layouts/component-restriction/UserGuestOnlyComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@src/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@src/components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@src/components/ui/tabs";

import LoginForm from "@src/components/navbar/LoginForm";
import SignUpForm from "@src/components/navbar/SignUpForm";
import MobileMenu from "@src/components/navbar/MobileMenu";
import EditProfileDialog from "@src/components/navbar/EditProfileDialog";
import AddToCartSheet from "@src/components/navbar/AddToCartSheet";
import fetchAllOrders from "@src/custom-hooks/fetchAllOrders";
import { SET_CART, selectCartItems } from "@src/redux/slice/cartSlice";
import { Button } from "@src/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRegisterLoginOpen, setIsRegisterLoginOpen] = useState(false);
  const [cartState, setCartState] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const isLoggedInRedux = useSelector(selectIsLoggedIn);
  const isAdminRedux = useSelector(selectIsAdmin);
  const cart = useSelector(selectCartItems);
  const navigate = useNavigate();
  const allOrders = fetchAllOrders();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const dispatch = useDispatch();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleRegisterLoginOpen = () => {
    setIsRegisterLoginOpen(true);
  };
  const handleRegisterLoginClose = () => {
    setIsRegisterLoginOpen(false);
  };

  const handleSignout = async () => {
    await signOut();
    navigate("/");
  }

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

        const fetchCart = async () => {
          const { data, error } = await supabase
            .from("cart")
            .select("cart")
            .eq("email", session.user.email)
            .maybeSingle();
          if (data) {
            setCartState(data.cart);
          } else {
            setCartState([]);
            dispatch(SET_CART([]));
          }
        };

        fetchCart();
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setIsLoggedIn(isLoggedInRedux);
  }, [isLoggedInRedux]);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  useEffect(() => {
    setIsAdmin(isAdminRedux);
  }, [isAdminRedux]);

  return (
    <div>
      {/* Navbar */}
      <nav
        className={` flex items-center justify-between lg:justify-around p-4 fixed top-0 left-0 w-full z-50 ${
          isAdmin ? "bg-green text-yellow" : "bg-black text-yellow"
        }`}
      >
        <div className="flex items-center space-x-4">
          <a href="/">
            <img src={MainLogo} alt="Logo" className="h-12" />
          </a>
        </div>

        <div className="hidden lg:flex lg:space-x-8 font-bakbak lg:text-lg text-base tracking-wider">
          <UserGuestOnlyComponent>
            <a href="/produce" className="hover:text-white">
              Produce
            </a>
          </UserGuestOnlyComponent>
          <LoggedInOnlyComponent forAdmin={false} forUser={true}>
            <a href="/tracking" className="hover:text-white">
              Tracking
            </a>
          </LoggedInOnlyComponent>
          <UserGuestOnlyComponent>
            <a href="/about-us" className="hover:text-white">
              About Us
            </a>
          </UserGuestOnlyComponent>
          <UserGuestOnlyComponent>
            <a href="/recommendations" className="hover:text-white">
              Recommendations
            </a>
          </UserGuestOnlyComponent>
          <LoggedInOnlyComponent forAdmin={true} forUser={false}>
            <a href="/admin/dashboard" className="hover:text-white">
              Overview
            </a>
          </LoggedInOnlyComponent>
          <LoggedInOnlyComponent forAdmin={true} forUser={false}>
            <a href="/admin/products" className="hover:text-white">
              Products
            </a>
          </LoggedInOnlyComponent>
          <LoggedInOnlyComponent forAdmin={true} forUser={false}>
            <a href="/admin/orders" className="hover:text-white">
              Orders
            </a>
          </LoggedInOnlyComponent>
          <LoggedInOnlyComponent forAdmin={true} forUser={false}>
            <a href="/admin/vouchers" className="hover:text-white">
              Vouchers
            </a>
          </LoggedInOnlyComponent>
          <LoggedInOnlyComponent forAdmin={true} forUser={false}>
            <a href="/admin/testimonials" className="hover:text-white">
              Testimonials
            </a>
          </LoggedInOnlyComponent>
          <LoggedInOnlyComponent forAdmin={true} forUser={false}>
            <a href="/admin/slideshow" className="hover:text-white">
              Slideshow
            </a>
          </LoggedInOnlyComponent>
        </div>

        <div className="flex items-center gap-4">
          <UserGuestOnlyComponent>
            <a href="/bulk-order" className="hidden lg:block">
              <Button className="bg-yellow text-green font-bakbak text-base px-4 lg:text-lg lg:px-6 rounded-full hover:bg-green hover:text-yellow ">
                Bulk Order
              </Button>
            </a>
          </UserGuestOnlyComponent>
          <LoggedInOnlyComponent forAdmin={false} forUser={true}>
            <AddToCartSheet cart={cartState} />
          </LoggedInOnlyComponent>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound
                  className={`h-6 cursor-pointer text-yellow hover:text-white ${
                    isAdmin ? "lg:min-w-[100px]" : ""
                  }`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 ">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleDialogOpen}
                  >
                    <UserPen className="mr-2 h-4 w-4" />
                    <span className="cursor-pointer">Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center cursor-pointer"
                    onClick={handleSignout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Dialog
                open={isRegisterLoginOpen}
                onOpenChange={setIsRegisterLoginOpen}                
              >
                <DialogTrigger>
                  <CircleUserRound className="h-6 cursor-pointer text-yellow hover:text-white" />
                </DialogTrigger>
                <DialogContent
                  className="max-w-[425px]"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2 mt-4">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">SignUp</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <LoginForm onSuccess={handleRegisterLoginClose} />
                    </TabsContent>
                    <TabsContent value="signup">
                      <SignUpForm onSuccess={handleRegisterLoginClose} />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </>
          )}

          <button
            className="lg:hidden flex items-center"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6 text-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        isAdmin={isAdmin}
      />

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default Navbar;
