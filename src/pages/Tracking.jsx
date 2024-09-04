import { useState } from "react";
import backgroundImage from "@src/assets/images/background-image.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Badge } from "@src/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Input } from "@src/components/ui/input";
import { ScrollArea } from "@src/components/ui/scroll-area";
import NoProduct from "@src/assets/images/NoProduct.png";

const productData = [
    {
      id: 1,
      name: "Leafy Vegetable",
      price: 500,
      quantity: 3,
      status: "delivered",
      deliveryDate: "2024-09-01T14:00:00Z",
      statusUpdateDate: "2024-08-28T10:00:00Z",
    },
    {
      id: 2,
      name: "Root Vegetable",
      price: 300,
      quantity: 2,
      status: "shipped",
      deliveryDate: null,
      statusUpdateDate: "2024-08-29T11:00:00Z",
    },
    {
      id: 3,
      name: "Tomato",
      price: 200,
      quantity: 5,
      status: "processing",
      deliveryDate: null,
      statusUpdateDate: "2024-08-30T09:00:00Z",
    },
    {
      id: 4,
      name: "Carrot",
      price: 150,
      quantity: 10,
      status: "order-placed",
      deliveryDate: null,
      statusUpdateDate: "2024-08-31T12:00:00Z",
    },
    {
      id: 5,
      name: "Cucumber",
      price: 250,
      quantity: 4,
      status: "delivered",
      deliveryDate: "2024-09-02T15:00:00Z",
      statusUpdateDate: "2024-08-30T14:00:00Z",
    },
    {
      id: 6,
      name: "Onion",
      price: 120,
      quantity: 6,
      status: "shipped",
      deliveryDate: null,
      statusUpdateDate: "2024-08-30T16:00:00Z",
    },
    {
      id: 7,
      name: "Bell Pepper",
      price: 350,
      quantity: 3,
      status: "processing",
      deliveryDate: null,
      statusUpdateDate: "2024-08-31T13:00:00Z",
    },
    {
      id: 8,
      name: "Potato",
      price: 180,
      quantity: 8,
      status: "order-placed",
      deliveryDate: null,
      statusUpdateDate: "2024-08-31T11:00:00Z",
    },
    {
      id: 9,
      name: "BLACK BEHI (PECHAY)",
      price: 220,
      quantity: 7,
      status: "delivered",
      deliveryDate: "2024-09-03T10:00:00Z",
      statusUpdateDate: "2024-08-31T10:00:00Z",
    },
    {
      id: 10,
      name: "Broccoli",
      price: 280,
      quantity: 5,
      status: "shipped",
      deliveryDate: null,
      statusUpdateDate: "2024-08-31T15:00:00Z",
    },
];
  
const statusLabels = {
    "order-placed": "Order Placed",
    "processing": "Processing",
    "shipped": "Shipped",
    "delivered": "Delivered",
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
  

const Tracking = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = productData.filter((product) => {
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div
      className="bg-cover bg-center min-h-screen h-full flex flex-col gap-7 items-center navbar-spacing w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">TRACK & TRACE</h1>
        <p className="font-spartan font-semibold text-white text-xs sm:text-base tracking-widest text-center">
          STAY IN TOUCH WITH YOUR PRODUCE FROM THE MOMENT IT GETS PICKED AND DELIVERED TO YOUR DOORSTEP
        </p>
      </div>
      <Card className="w-full max-w-[700px] min-h-[600px]">
        <VisuallyHidden>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </VisuallyHidden>
        <CardContent className="flex flex-col py-6 gap-4">
          <div className="flex w-full flex-col sm:flex-row items-end sm:justify-between gap-4">
            <Input
              type="text"
              placeholder="Find the product here"
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card key={product.id} className="flex justify-between items-start p-4">
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-lg">{product.name}</h1>
                      <p className="font-md text-sm text-yellow">Price: ₱{product.price}</p>
                      <p className="font-light text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                      <p className="font-light text-sm text-green-50 mt-1">
                        {product.status === "delivered"
                          ? `Delivered: ${formatDate(product.deliveryDate)}`
                          : `Updated: ${formatDate(product.statusUpdateDate)}`}
                      </p>
                    </div>
                    <Badge className="max-h-[20px] text-nowrap">
                        {statusLabels[product.status] || "Unknown Status"}
                    </Badge>
                  </Card>
                ))
              ) : (
                
                <div className="flex flex-col justify-center items-center">
                    <img src={NoProduct} alt="No product picture" className="max-w-[300px]" />
                    <p className="text-center">No products found</p>
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
