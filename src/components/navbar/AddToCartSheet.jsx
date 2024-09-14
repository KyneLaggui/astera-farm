import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@src/components/ui/sheet';
import { Button } from '@src/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import CartProducts from '@src/components/order-components/CartProducts';
import { ScrollArea } from '@src/components/ui/scroll-area';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@src/components/ui/drawer';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, SET_CART } from '@src/redux/slice/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"

const AddToCartSheet = ({ cart }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [cartState, setCartState] = useState([]);
  const [cartPriceState, setCartPriceState] = useState(0);
  // const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  useEffect(() => {
    if (cart) {
      setCartState(cart);
      dispatch(SET_CART(cart));
    }
  }, [cart])

  useEffect(() => {
    setCartPriceState(cartTotalAmount);
  
  }, [cartTotalAmount])

  return (
    <>
      {isDesktop ? (
        <Sheet>
          <SheetTrigger asChild>
            <ShoppingCart className="h-6 cursor-pointer text-yellow" />
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between" onOpenAutoFocus={(e) => e.preventDefault()}>
            <SheetHeader>
              <SheetTitle>Add to Cart</SheetTitle>
              <SheetDescription>
                Add items to your cart with a click and review them before checkout.
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-full">
              <div className='flex flex-col gap-2'>
                {cartState.map((item, index) => (
                  <CartProducts
                    key={index}
                    image={item.image}
                    title={item.name}
                    amount={item.price}
                    initialQuantity={item.cartQuantity}
                    productId={item.id}
                  />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="border-t pt-4">
              <h1 className='text min-w-[100px] text-md font-medium'>Total Price <span className='text-yellow'>₱{cartPriceState}</span></h1>
              <SheetClose asChild>
                <Button type="submit" className="w-full" onClick={() => navigate("/checkout")}>Checkout</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <ShoppingCart className="h-6 cursor-pointer text-yellow" />
          </DrawerTrigger>
          <DrawerContent className="flex flex-col max-h-[90vh]" onOpenAutoFocus={(e) => e.preventDefault()}>
            <DrawerHeader className="text-left">
              <DrawerTitle>Add to Cart</DrawerTitle>
              <DrawerDescription>
                Add items to your cart with a click and review them before checkout.
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="p-4 overflow-y-auto">
              <div className='flex flex-col gap-2'>
                {cartState.map((item, index) => (
                  <CartProducts
                    key={index}
                    image={item.image}
                    title={item.name}
                    amount={item.price}
                    initialQuantity={item.cartQuantity}
                    productId={item.id}
                  />
                ))}
              </div>
            </ScrollArea>
            <DrawerFooter className="flex flex-row border-t pt-4">
              <h1 className='text min-w-[100px] text-md font-medium'>Total Price <span className='text-yellow'>₱{cartPriceState}</span></h1>
              <DrawerClose asChild>
                <Button type="submit" className="w-full" onClick={() => navigate("/checkout")}>Checkout</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default AddToCartSheet;
