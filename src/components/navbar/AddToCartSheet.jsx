import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@src/components/ui/sheet';
import { Button } from '@src/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import CartProducts from '@src/components/order-components/CartProducts';
import { ScrollArea } from '@src/components/ui/scroll-area';

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
  );
};

export default AddToCartSheet;