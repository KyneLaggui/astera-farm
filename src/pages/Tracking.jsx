import { useState } from "react";
import backgroundImage from "@src/assets/images/about-us-pic-2.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@src/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Badge } from "@src/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { Input } from "@src/components/ui/input";
import { ScrollArea } from "@src/components/ui/scroll-area";
import NoProduct from "@src/assets/images/NoProduct.png";
import OrderCard from "@src/components/OrderCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrders } from "@src/redux/slice/ordersSlice";
import { selectUserID } from "@src/redux/slice/authSlice";

const Tracking = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderData, setOrderData] = useState([]);

  const orders = useSelector(selectOrders); // Select products from Redux state
  const userId = useSelector(selectUserID);

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const formatPaymentMethod = (paymentMethod) => {
    return paymentMethod
      .replace(/_/g, " ") // Replace underscores with spaces
      .split(" ") // Split into words
      .map(capitalizeFirstLetter) // Capitalize first letter of each word
      .join(" "); // Join them back with a space
  };

  const filteredOrders = orderData.filter((order) => {
    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;
    const matchesSearch = order.orderId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    if (orders) {
      const filteredOrders = orders
        .filter((order) => order.userId === userId) // Replace with your target email
        .map((order) => ({
          userId: order.userId,
          orderId: order.id,
          userName: order.shippingAddress.recipientName,
          userAddress: `${order.shippingAddress.street} Street, Brgy. ${order.shippingAddress.barangay}, ${order.shippingAddress.city}`,
          userPhone: order.shippingAddress.phone,
          paymentMethod: formatPaymentMethod(order.paymentMethod),
          status: order.status,
          deliveryDate: order.lastUpdated,
          statusUpdateDate: order.lastUpdated,
          products: order.cart.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.amount,
            quantity: product.quantity,
          })),
        }));
  
      setOrderData(filteredOrders);
    }
  }, [orders, userId]);
  

  return (
    <div
      className="relative bg-cover min-h-screen h-full flex flex-col gap-7 items-center navbar-spacing w-full "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      <div className="flex flex-col justify-center items-center z-10">
        <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
          TRACK & TRACE
        </h1>
        <p className="font-spartan font-semibold text-white text-xs sm:text-base tracking-widest text-center max-w-[600px]">
          STAY IN TOUCH WITH YOUR PRODUCE FROM THE MOMENT IT GETS PICKED AND
          DELIVERED TO YOUR DOORSTEP
        </p>
      </div>
      <Card className="w-full max-w-[700px] min-h-[600px] z-10">
        <VisuallyHidden>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </VisuallyHidden>
        <CardContent className="flex flex-col py-6 gap-4">
          <div className="flex w-full flex-col sm:flex-row items-end sm:justify-between gap-4">
            <Input
              type="text"
              placeholder="Search Order ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Order Placed">Order Placed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea>
            <div className="flex flex-col gap-4 max-h-[500px]">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={NoProduct}
                    alt="No orders"
                    className="max-w-[300px]"
                  />
                  <p className="text-center">No orders found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tracking;
