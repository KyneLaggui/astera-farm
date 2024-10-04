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
import { toast } from "react-toastify";
import { z } from "zod";

const BulkOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    deliveryAddress: "",
    paymentMethod: "", // Ensure this is initialized as an empty string
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

    // Define Zod schema
    const formSchema = z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      mobile: z
        .string()
        .regex(/^09\d{9}$/, "Invalid mobile number"),
      email: z.string().email("Invalid email address"),
      deliveryAddress: z.string().min(1, "Delivery address is required"),
      paymentMethod: z.string().min(1, "Please select a payment method"),
      orders: z
        .array(
          z.object({
            name: z.string(),
            quantity: z.string().min(1, "Quantity is required"),
          })
        )
        .min(1, "Please select at least one product and provide quantities"),
    });

    // Extract selected products with quantity
    const selectedProducts = products
      .filter((product) => product.isSelected && product.quantity)
      .map((product) => ({ name: product.name, quantity: product.quantity }));

    // Validate the form data
    const validation = formSchema.safeParse({
      ...formData,
      orders: selectedProducts,
    });

    if (!validation.success) {
      // Show error messages using toast
      validation.error.errors.forEach((err) => toast.error(err.message));
      return;
    }

    // If validation is successful, proceed with email sending
    const emailData = {
      ...formData,
      orders: selectedProducts
        .map((product) => `- ${product.name} x ${product.quantity}`)
        .join("\n"),
      main_logo:
        "https://drive.google.com/uc?id=13Tf4IXSv872fMa7cCYrP_njtyb7R2FKL",
      header_picture:
        "https://drive.google.com/uc?id=1viVsod684bmklZ_W7De5lHZzXfBq-bWz",
    };

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_BULK_ORDER;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs.send(serviceID, templateID, emailData, userID).then(
      (result) => {
        toast.success("Order sent successfully");

        // Reset the formData to its initial state
        setFormData({
          firstName: "",
          lastName: "",
          mobile: "",
          email: "",
          deliveryAddress: "",
          paymentMethod: "", // Reset to empty string
          orders: [],
        });

        setProducts((prevProducts) =>
          prevProducts.map((product) => ({
            ...product,
            isSelected: false,
            quantity: "",
          }))
        );
      },
      (error) => {
        toast.error("Failed to send order, please try again");
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
              placeholder="Enter address"
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label>Preferred Mode of Payment</Label>
            <Select
              value={formData.paymentMethod} // Bind the select value to the formData state
              onValueChange={handlePaymentMethodChange}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a payment method">
                  {formData.paymentMethod || ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Methods</SelectLabel>
                  <SelectItem value="Gcash">Gcash</SelectItem>
                  <SelectItem value="Bank Deposit">Bank Deposit</SelectItem>
                  <SelectItem value="PayMaya">PayMaya</SelectItem>
                  <SelectItem value="BillEase">BillEase</SelectItem>
                  <SelectItem value="COD">Cash on Delivery</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Section */}
          <ScrollArea className="h-[300px] p-4 border rounded-md">
            <Input
              type="text"
              placeholder="Search for products"
              className="mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between mb-2 gap-2"
              >
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id={product.id}
                    checked={product.isSelected}
                    onCheckedChange={(isSelected) =>
                      handleCheckboxChange(product.id, isSelected)
                    }
                  />
                  <Label htmlFor={product.id}>{product.name}</Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Label htmlFor={`quantity_${product.id}`}>Quantity:</Label>
                  <Input
                    type="text"
                    id={`quantity_${product.id}`}
                    className="w-[60px]"
                    disabled={!product.isSelected}
                    value={product.quantity}
                    onChange={(e) =>
                      handleProductChange(product.id, e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </ScrollArea>

          <Button type="submit" className="mt-4 w-full">
            Submit Order
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BulkOrder;
