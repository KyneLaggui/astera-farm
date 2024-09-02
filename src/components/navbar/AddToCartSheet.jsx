import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@src/components/ui/sheet';
import { Button } from '@src/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import CartProducts from '@src/components/order-components/CartProducts';
import { ScrollArea } from '@src/components/ui/scroll-area';
import Vegetable1 from '@src/assets/images/Vegetable-1.png';
import Vegetable2 from '@src/assets/images/Vegetable-2.png';
import Vegetable3 from '@src/assets/images/Vegetable-3.png';
import Vegetable4 from '@src/assets/images/Vegetable-4.png';
import Vegetable5 from '@src/assets/images/Vegetable-5.png';

const cartItems = [
  { image: Vegetable1, title: 'SUPERNOVA BETELGEUSE', amount: 149.00, quantity: 10 },
  { image: Vegetable2, title: 'CRYSTAL LETTUCE', amount: 99.00, quantity: 5 },
  { image: Vegetable3, title: 'GALACTIC SPINACH', amount: 79.00, quantity: 8 },
  { image: Vegetable4, title: 'COSMIC KALE', amount: 129.00, quantity: 3 },
  { image: Vegetable5, title: 'LEON ADRIEL FRANCO AGCAOILI ADBAJWDBAJD', amount: 159.00, quantity: 7 },
];

const AddToCartSheet = () => {
  return (
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
            {cartItems.map((item, index) => (
              <CartProducts
                key={index}
                image={item.image}
                title={item.title}
                amount={item.amount}
                initialQuantity={item.quantity}
              />
            ))}
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
  );
};

export default AddToCartSheet;