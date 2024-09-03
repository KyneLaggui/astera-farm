import React, { useState } from "react";
import backgroundImage from "@src/assets/images/background-image.png";
import { Button } from "@src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@src/components/ui/card";
import { Checkbox } from "@src/components/ui/checkbox";
import EditAddressDialog from "@src/components/checkout/EditAddressDialog";
import AddAddressDialog from "@src/components/checkout/AddAddressDialog";
import { Pencil, Plus, Trash } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogAction, AlertDialogCancel } from "@src/components/ui/alert-dialog";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const initialAddressData = [
    {
      id: 1,
      name: "Carlos Santos",
      phone: "09178889900",
      street: "789 P. Santos Street",
      baranggay: "Barangay San Antonio",
      postal_code: "1605",
      city: "Pasig City",
    },
    {
      id: 2,
      name: "Andrea Reyes",
      phone: "09223334455",
      street: "123 C. Raymundo Avenue",
      baranggay: "Barangay Rosario",
      postal_code: "1609",
      city: "Pasig City",
    },
    {
      id: 3,
      name: "Luis Gonzales",
      phone: "09336667788",
      street: "456 General Luna Street",
      baranggay: "Barangay Ususan",
      postal_code: "1630",
      city: "Taguig City",
    },
  ];

  const [addressData, setAddressData] = useState(initialAddressData);

  const productData = [
    {
      id: 1,
      name: "Leafy Vegetable",
      price: 500,
      quantity: 3,
    },
    {
      id: 2,
      name: "Root Vegetable",
      price: 300,
      quantity: 2,
    },
    // Add more products here if needed
  ];

  const handleAddressSelect = (id) => {
    setSelectedAddress((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (e, addressId) => {
    e.stopPropagation();
    if (selectedAddress === addressId) {
      setIsEditDialogOpen(true);
    }
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (addressData.length >= 3) {
      alert("Account is up to 3 addresses only, please delete an address first.");
      return;
    }
    setIsAddDialogOpen(true);
  };

  const handleDeleteClick = (e, addressId) => {
    e.stopPropagation();
    setAddressToDelete(addressId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setAddressData((prev) => prev.filter((address) => address.id !== addressToDelete));
    setSelectedAddress(null);
    setIsDeleteDialogOpen(false);
  };

  const formatAddress = (address) => {
    const fullAddress = `${address.street}, ${address.baranggay}, ${address.postal_code}, ${address.city}`;
    const maxLength = 30; 
    return fullAddress.length > maxLength
      ? `${fullAddress.slice(0, maxLength)}...`
      : fullAddress;
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen h-full flex flex-col items-center navbar-spacing w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Checkout Page</CardTitle>
          <CardDescription>Complete your purchase securely and effortlessly in just a few steps.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row min-h-[400px] sm:min-w-[600px] md:min-w-[800px]">
          <div className="flex flex-col gap-4 w-full">
            <Card className="p-4 flex items-center h-[100px] justify-center cursor-pointer" onClick={handleAddClick}>
              <Plus />
            </Card>

            {addressData.map((address) => (
              <Card
                key={address.id}
                className={`p-4 flex items-center gap-4 max-h-[100px] ${
                  selectedAddress === address.id ? "border-yellow" : ""
                }`}
                onClick={() => handleAddressSelect(address.id)}
              >
                <Checkbox
                  checked={selectedAddress === address.id}
                  onChange={() => handleAddressSelect(address.id)}
                />
                <div className="flex justify-between w-full">
                  <div>
                    <h1 className="font-semibold text-lg">{address.name}</h1>
                    <p className="font-light text-sm text-muted-foreground truncate">
                        {formatAddress(address)}
                    </p>
                    <p className="font-light text-sm text-muted-foreground">{address.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Pencil
                      size={16}
                      onClick={(e) => handleEditClick(e, address.id)}
                      className={selectedAddress !== address.id ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"}
                    />
                    <Trash
                      size={16}
                      onClick={(e) => handleDeleteClick(e, address.id)}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-4 sm:min-h-full w-full flex flex-col gap-4">
            <CardHeader className="px-0 pt-1 sm:text-end">
              <CardTitle>Checkout Summary</CardTitle>
              <CardDescription className="text-yellow text-md">
                Subtotal: ₱
                {productData.reduce((total, item) => total + item.price * item.quantity, 0)}
              </CardDescription>
            </CardHeader>
            {productData.map((product) => (
              <Card key={product.id} className="p-4 flex flex-col max-h-[100px]">
                <h1 className="font-semibold text-lg">{product.name}</h1>
                <p className="font-md text-sm text-yellow">Price: ₱{product.price}</p>
                <p className="font-light text-sm text-muted-foreground">Quantity: {product.quantity}</p>
              </Card>
            ))}
          </Card>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Proceed to Payment</Button>
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <EditAddressDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        address={addressData.find((addr) => addr.id === selectedAddress)}
      />
      <AddAddressDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <AlertDialogHeader>
            <h1 className="text-xl font-semibold">Delete Address</h1>
            <p>Are you sure you want to delete this address? This action cannot be undone.</p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Checkout;
