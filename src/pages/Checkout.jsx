import { useEffect, useState } from "react";
import { supabase } from "@src/supabase/config"; // Import the Supabase client
import backgroundImage from "@src/assets/images/background-image.png";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Checkbox } from "@src/components/ui/checkbox";
import EditAddressDialog from "@src/components/checkout/EditAddressDialog";
import AddAddressDialog from "@src/components/checkout/AddAddressDialog";
import { Pencil, Plus, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@src/components/ui/alert-dialog";
import fetchUserShippingAddress from "@src/custom-hooks/fetchUserShippingAddress";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectEmail } from "@src/redux/slice/authSlice";
import { selectCartItems } from "@src/redux/slice/cartSlice";
import { set } from "zod";
import { toast } from "react-toastify";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [userEmailState, setUserEmailState] = useState("");

  const userEmail = useSelector(selectEmail);
  const userCart = useSelector(selectCartItems);
  const navigate = useNavigate();

  const shippingAddress = fetchUserShippingAddress();
  const [addressData, setAddressData] = useState([]);
  const [productData, setProductData] = useState([]);

  const handleAddressSelect = (id) => {
    setSelectedAddress((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (e, addressId) => {
    e.stopPropagation();
    if (selectedAddress === addressId) {
      setIsEditDialogOpen(true);
    }
  };

  const handleAddClick = async (newAddress) => {
    if (addressData.length >= 3) {
      toast.error(
        "Account is up to 3 addresses only, please delete an address first."
      );
      return;
    }
    const { data, error } = await supabase
      .from("shipping_address")
      .insert({
        barangay: newAddress.barangay,
        city: newAddress.city,
        postal_code: newAddress.postalCode,
        street: newAddress.street,
        recipient_name: newAddress.recipientName,
        phone_number: newAddress.phoneNumber,
        email: userEmailState,
      })
      .select()
      .single();

    if (error) {
      console.log(error);
    } else {
      setAddressData((prev) => [...prev, { id: data.id, ...newAddress }]);
      setIsAddDialogOpen(false);
    }
  };

  const handleAddressUpdate = (updatedAddress) => {
    setAddressData((prev) =>
      prev.map((address) =>
        address.id === updatedAddress.id
          ? {
              ...address,
              recipientName: updatedAddress.recipient_name,
              phone: updatedAddress.phone_number,
              street: updatedAddress.street,
              barangay: updatedAddress.barangay,
              city: updatedAddress.city,
              postalCode: updatedAddress.postal_code,
            }
          : address
      )
    );
  };

  const handleDeleteClick = (e, addressId) => {
    e.stopPropagation();
    setAddressToDelete(addressId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const { error } = await supabase
        .from("shipping_address")
        .delete()
        .eq("id", addressToDelete);

      if (error) throw error;

      setAddressData((prev) =>
        prev.filter((address) => address.id !== addressToDelete)
      );
      setSelectedAddress(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };

  const formatAddress = (address) => {
    const fullAddress = `${address.street}, ${address.barangay}, ${address.postalCode}, ${address.city}`;
    const maxLength = 30;
    return fullAddress.length > maxLength
      ? `${fullAddress.slice(0, maxLength)}...`
      : fullAddress;
  };

  const proceedToPayment = () => {
    if (!selectedAddress) {
      toast.error("Please select an address to proceed.");
    } else {
      navigate("/checkout-paymongo", {
        state: {
          shippingAddress: addressData.find(
            (addr) => addr.id === selectedAddress
          ),
        },
      });
    }
  };

  useEffect(() => {
    if (shippingAddress) {
      console.log(shippingAddress);
      const allShippingAddress = shippingAddress.map((address) => ({
        id: address.id,
        recipientName: address.recipient_name,
        phone: address.phone_number,
        street: address.street,
        barangay: address.barangay,
        city: address.city,
        postalCode: address.postal_code,
      }));
      setAddressData(allShippingAddress);
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (userEmail) {
      setUserEmailState(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userCart) {
      const userCartData = userCart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.cartQuantity,
      }));

      setProductData(userCartData);
    }
  }, [userCart]);

  return (
    <div
      className="bg-cover bg-center min-h-screen h-full flex flex-col items-center navbar-spacing w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Checkout Page</CardTitle>
          <CardDescription>
            Complete your purchase securely and effortlessly in just a few
            steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row min-h-[400px] sm:min-w-[600px] md:min-w-[800px]">
          <div className="flex flex-col gap-4 w-full">
            <Card
              className="p-4 flex items-center h-[100px] justify-center cursor-pointer"
              onClick={() => setIsAddDialogOpen(true)}
            >
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
                    <h1 className="font-semibold text-lg">
                      {address.recipientName}
                    </h1>
                    <p className="font-light text-sm text-muted-foreground truncate">
                      {formatAddress(address)}
                    </p>
                    <p className="font-light text-sm text-muted-foreground">
                      {address.phoneNumber}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Pencil
                      size={16}
                      onClick={(e) => handleEditClick(e, address.id)}
                      className={
                        selectedAddress !== address.id
                          ? "text-gray-400 cursor-not-allowed"
                          : "cursor-pointer"
                      }
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
                {productData
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toLocaleString()}
              </CardDescription>
            </CardHeader>
            {productData.map((product) => (
              <Card
                key={product.id}
                className="p-4 flex flex-col max-h-[100px]"
              >
                <h1 className="font-semibold text-lg">{product.name}</h1>
                <p className="font-md text-sm text-yellow">
                  Price: ₱{product.price}
                </p>
                <p className="font-light text-sm text-muted-foreground">
                  Quantity: {product.quantity}
                </p>
              </Card>
            ))}
          </Card>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={proceedToPayment}>
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>

      {/* Dialogs */}
      <EditAddressDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        address={addressData.find((addr) => addr.id === selectedAddress)}
        onSave={handleAddressUpdate} // Pass the handleAddressUpdate function
      />
      <AddAddressDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddClick} // Pass the handleAddClick to the dialog
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Delete Address
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this address? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Checkout;
