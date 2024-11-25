import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@src/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@src/components/ui/alert-dialog"
import { Button } from "@src/components/ui/button"
import { MapPin, Navigation, Phone } from "lucide-react";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { supabase } from "@src/supabase/config";
import { toast } from "react-toastify";

const statusLabels = {
  "Order Placed": "Order Placed",
  Processing: "Processing",
  Shipped: "Shipped",
  Delivered: "Delivered",
};

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const calculateTotalAmount = (products) =>
  products.reduce((sum, product) => sum + product.price * product.quantity, 0);

const formatCurrency = (value) =>
  value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });



const OrderCard = ({ order, removeOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cancelOrder = async (orderId) => {  
    console.log(orderId)
    const { error: updateOrderError, data: updateOrderData } = await supabase
    .from('order')
    .update({ status: 'Cancelled' })
    .eq('order_id', orderId)    
    .select() // This ensures the updated row is returned
    .single();   

    if (updateOrderError) {
      toast.error("An error has occured.");
    } else {
      toast.success("Order cancelled successfully!");
      setIsOpen(false)
      removeOrder(orderId);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card
          key={order.orderId}
          className="flex flex-col gap-2 sm:flex-row sm:justify-between items-start p-4 cursor-pointer"
        >
          <div className="flex flex-col">
            <h1 className="font-semibold break-all text-lg">
              Order ID: {order.orderId}
            </h1>
            <p className="font-md text-sm text-yellow">
              Total: ₱{formatCurrency(calculateTotalAmount(order.products))}
            </p>
            <p className="font-light text-sm text-green-50 mt-1">
              {order.status === "Delivered"
                ? `Delivered: ${formatDate(order.deliveryDate)}`
                : `Updated: ${formatDate(order.statusUpdateDate)}`}                
            </p>
         
          </div>
          <Badge className="max-h-[20px] text-nowrap">
            {statusLabels[order.status] || "Unknown Status"}
          </Badge>
        </Card>
      </DialogTrigger>
      <DialogContent className="p-4 pt-10">
        <DialogHeader className="flex flex-col items-start">
          <div className="flex flex-col items-start sm:flex-row gap-2 justify-between sm:items-center w-full">
            <DialogTitle className="text-lg break-all text-start ">
              Order ID: {order.orderId}
            </DialogTitle>
            <Badge className="max-h-[20px] max-w-fit text-nowrap">
              {statusLabels[order.status] || "Unknown Status"}
            </Badge>
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="font-md text-sm text-yellow">
                Total: ₱{formatCurrency(calculateTotalAmount(order.products))}
              </p>
              <p className="text-sm font-light text-muted-foreground">
                {order.status === "Delivered"
                  ? `Delivered: ${formatDate(order.deliveryDate)}`
                  : `Updated: ${formatDate(order.statusUpdateDate)}`}
              </p>
            </div>
            {
              order.status === "Order Placed" && (                
                <AlertDialog>
                 <AlertDialogTrigger asChild>
                   <Button variant="outline">Cancel</Button>
                 </AlertDialogTrigger>
                 <AlertDialogContent>
                   <AlertDialogHeader>
                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                     <AlertDialogDescription>
                       This action cannot be undone. This will permanently delete your
                       order from the server.
                     </AlertDialogDescription>
                   </AlertDialogHeader>
                   <AlertDialogFooter>
                     <AlertDialogCancel>Cancel</AlertDialogCancel>
                     <AlertDialogAction onClick={async() => await cancelOrder(order.orderId)}>Continue</AlertDialogAction>
                   </AlertDialogFooter>
                 </AlertDialogContent>
               </AlertDialog>
              )
            }
          
          </div>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-4">
          <ScrollArea>
            <div className="flex flex-col gap-2 max-h-[250px]">
              {order.products.map((product) => (
                <Card
                  key={product.id}
                  className="p-4 flex flex-col max-h-[100px]"
                >
                  <h1 className="font-semibold text-lg">{product.name}</h1>
                  <p className="font-md text-sm text-yellow">
                    Price: ₱{formatCurrency(product.price)}
                  </p>
                  <p className="font-light text-sm text-muted-foreground">
                    Quantity: {product.quantity}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <Card className="flex justify-between px-5 py-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold">{order.userName}</h1>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <h1 className="text-yellow">Address</h1>
                  <p className="text-muted-foreground">{order.userAddress}</p>
                </div>
                <div className="flex flex-col  ">
                  <h1 className="text-yellow">Phone Number</h1>
                  <p className="text-muted-foreground">{order.userPhone}</p>
                </div>
              </div>
            </div>
            <Badge className="max-h-[20px] text-nowrap">
              {order.paymentMethod}
            </Badge>
          </Card>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userAddress: PropTypes.string.isRequired,
    userPhone: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    deliveryDate: PropTypes.string,
    statusUpdateDate: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default OrderCard;
