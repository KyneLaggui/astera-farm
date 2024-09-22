import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Label } from "@src/components/ui/label";
import { Input } from "@src/components/ui/input";
import { Checkbox } from "@src/components/ui/checkbox";
import { Button } from "@src/components/ui/button";

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    company: "",
    orders: [],
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", isSelected: false, quantity: "" },
    { id: 2, name: "Product 2", isSelected: false, quantity: "" },
    { id: 3, name: "Product 3", isSelected: false, quantity: "" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProducts = products
      .filter((product) => product.isSelected && product.quantity)
      .map((product) => `${product.name}: ${product.quantity}`);

    if (selectedProducts.length === 0) {
      alert("Please select at least one product and provide quantities");
      return;
    }

    const emailData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile: formData.mobile,
      email: formData.email,
      company: formData.company || "None",
      orders: selectedProducts.join(", "),
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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 space-y-6 navbar-spacing  shadow-lg rounded-lg "
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
            required
            className=""
          />
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className=""
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
            required
            className=""
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className=""
          />
        </div>
      </div>

      <div>
        <Label>Company (Optional)</Label>
        <Input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="None"
          className=""
        />
      </div>

      {/* Order Products */}
      <div>
        <Label className="text-lg font-semibold">Select Products</Label>
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4">
            <Label className="flex items-center space-x-2">
              <Checkbox
                onChange={(e) =>
                  handleCheckboxChange(product.id, e.target.checked)
                }
              />
              <span>{product.name}</span>
            </Label>
            {product.isSelected && (
              <Input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(product.id, e.target.value)
                }
                placeholder="Quantity"
                className=""
              />
            )}
          </div>
        ))}
      </div>

      <Button type="submit" className="">
        Submit Order
      </Button>
    </form>
  );
};

export default BulkOrder;
