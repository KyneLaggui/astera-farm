import React, { useState } from "react";
import emailjs from "emailjs-com";

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
      className="max-w-lg mx-auto p-4 space-y-6 navbar-spacing bg-yellow shadow-lg rounded-lg text-black"
    >
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Company (Optional)
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="None"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Order Products */}
      <div>
        <h3 className="text-lg font-semibold">Select Products</h3>
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCheckboxChange(product.id, e.target.checked)
                }
              />
              <span>{product.name}</span>
            </label>
            {product.isSelected && (
              <input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(product.id, e.target.value)
                }
                placeholder="Quantity"
                className="mt-1 block w-20 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
      >
        Submit Order
      </button>
    </form>
  );
};

export default BulkOrder;
