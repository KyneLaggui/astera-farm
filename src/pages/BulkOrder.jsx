import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { Label } from "@src/components/ui/label";
import { Input } from "@src/components/ui/input";
import { Checkbox } from "@src/components/ui/checkbox";
import { Button } from "@src/components/ui/button";
import { Card } from "@src/components/ui/card";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@src/components/ui/select";
import { ScrollArea } from "@src/components/ui/scroll-area";
import fetchAllProduct from "@src/custom-hooks/fetchAllProduct";

const BulkOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    deliveryAddress: "",
    paymentMethod: "",
    orders: [],
  });

  const [products, setProducts] = useState([]);
  const { products: fetchedProducts } = fetchAllProduct();

  useEffect(() => {
    if (fetchedProducts) {
      const productList = fetchedProducts.map((product) => ({
        id: product.id,
        name: product.name,
        isSelected: false,
        quantity: "",
      }));
      setProducts(productList);
    }
  }, [fetchedProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: value,
    }));
  };

  const handleProductChange = (productId, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const handleCheckboxChange = (productId, isSelected) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              isSelected,
              quantity: isSelected ? product.quantity : "",
            }
          : product
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProducts = products
      .filter((product) => product.isSelected && product.quantity)
      .map((product) => `${product.name} x ${product.quantity}`);

    if (selectedProducts.length === 0) {
      alert("Please select at least one product and provide quantities");
      return;
    }

    const emailData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile: formData.mobile,
      email: formData.email,
      deliveryAddress: formData.deliveryAddress,
      paymentMethod: formData.paymentMethod,
      orders: selectedProducts.join("\n"),
    };

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_BULK_ORDER;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs.send(serviceID, templateID, emailData, userID).then(
      (result) => {
        alert("Order sent successfully");
        console.log("Email sent successfully:", result.text);
      },
      (error) => {
        alert("Failed to send order, please try again");
        console.log(error);
      }
    );
  };

  return (
    <div className="flex justify-center navbar-spacing">
      <Card className="flex flex-col lg:flex-row gap-10 justify-between p-10  max-w-[1200px] w-full">
        <div className="flex flex-col gap-6 lg:max-w-[600px] w-full lg:p-4">
          <h1 className="text-4xl sm:text-6xl text-yellow font-semibold font-spartan">
            Bulk Order Form
          </h1>
          <div className="flex flex-col gap-6 text-sm sm:text-base ">
            <p className="">
              We welcome wholesale orders and partnerships with corporate
              clients, including{" "}
              <span className="text-yellow">
                restaurants, hotels, commissaries, food establishments,
              </span>{" "}
              and more. Please fill out the form below to place your bulk order
              or inquire about{" "}
              <span className="text-yellow">special terms and pricing</span>.
            </p>
            <p>
              Our team at <span className="text-yellow">Astera Farms</span> will
              get back to you{" "}
              <span className="text-yellow">within 24 hours</span> to confirm
              your order or address any specific needs you may have. For{" "}
              <span className="text-yellow">immediate assistance</span>, feel
              free to call us at{" "}
              <span className="text-yellow">09424483611</span>.
            </p>
            <p>
              We look forward to working with you to provide{" "}
              <span className="text-yellow">fresh, high-quality produce</span>{" "}
              for your business!
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 lg:min-w-[500px]"
        >
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Juan"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Dela Cruz"
                className="mt-1"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="">Mobile Number</Label>
              <Input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="09123456789"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                className="mt-1"
                value={formData.email}
                placeholder="juandelacruz@gmail.com"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <Label>Delivery Address</Label>
            <Input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              required
              className="mt-1"
              placeholder="123 Block Bocaue Bulacan"
            />
          </div>
          {/* Preferred Mode of Payment */}
          <div>
            <Label>Preferred Payment Method</Label>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onValueChange={handlePaymentMethodChange}
              required
              className="mt-1"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Methods</SelectLabel>
                  <SelectItem value="Gcash">Gcash</SelectItem>
                  <SelectItem value="PayMaya">PayMaya</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="GrabPay">GrabPay</SelectItem>
                  <SelectItem value="BillEase">BillEase</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Order Products */}
          <div>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4 md:items-center">
              <Label className="text-lg font-semibold text-nowrap">
                Select Products
              </Label>
              <Input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=""
              />
            </div>
            <ScrollArea>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[120px] px-4 h-full gap-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="flex flex-col space-y-2 ">
                      <Label className="flex items-center space-x-2">
                        <Checkbox
                          checked={product.isSelected}
                          onCheckedChange={(isChecked) =>
                            handleCheckboxChange(product.id, isChecked)
                          }
                        />
                        <span>{product.name}</span>
                      </Label>
                      {product.isSelected && (
                        <Input
                          type="number"
                          min="1"
                          className="w-full appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductChange(product.id, e.target.value)
                          }
                          placeholder="Quantity"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-4">
                    No products found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <Button type="submit">Submit Order</Button>
        </form>
      </Card>
    </div>
  );
};

export default BulkOrder;
