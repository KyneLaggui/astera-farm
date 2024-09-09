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

const Tracking = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const orderData = [
    {
      orderId: "ORD12345",
      userName: "John Doe",
      userAddress: "123 Main Street, City",
      userPhone: "123-456-7890",
      paymentMethod: "Credit Card",
      status: "delivered",
      deliveryDate: "2024-09-01T14:00:00Z",
      statusUpdateDate: "2024-08-28T10:00:00Z",
      products: [
        { id: 1, name: "Leafy Vegetable", price: 500, quantity: 3 },
        { id: 2, name: "Root Vegetable", price: 300, quantity: 2 },
        { id: 2, name: "Root Vegetable", price: 300, quantity: 2 },
        { id: 2, name: "Root Vegetable", price: 300, quantity: 2 },
      ],
    },
    {
      orderId: "ORD67890",
      userName: "Jane Smith",
      userAddress: "456 Another Road, Town",
      userPhone: "987-654-3210",
      paymentMethod: "PayPal",
      status: "shipped",
      deliveryDate: null,
      statusUpdateDate: "2024-08-29T11:00:00Z",
      products: [
        { id: 3, name: "Tomato", price: 200, quantity: 5 },
        { id: 4, name: "Carrot", price: 150, quantity: 10 },
      ],
    },
  ];

  const filteredOrders = orderData.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch = order.orderId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="order-placed">Order Placed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
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
