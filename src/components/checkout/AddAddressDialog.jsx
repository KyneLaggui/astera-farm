import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@src/components/ui/dialog";
import { Button } from "@src/components/ui/button";
import { Label } from "@src/components/ui/label";
import { Input } from "@src/components/ui/input";
import { ScrollArea } from "@src/components/ui/scroll-area";

const AddAddressDialog = ({ open, onClose, onAdd }) => {

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    street: '',
    barangay: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddAddress = () => {
    if (Object.values(formData).some(value => !value)) {
      alert("Please fill out all fields.");
      return;
    }

    onAdd(null, formData);  // Pass the new address data to the parent
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogDescription>To keep your details up to date for seamless service.</DialogDescription>
        <ScrollArea className="space-y-2 max-h-[350px] sm:max-h-full">
          <div className="px-1">
            <div className="space-y-1">
              <Label htmlFor="name">Recipient Name</Label>
              <Input id="name" type="text" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="number" value={formData.phoneNumber} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="street">Street</Label>
              <Input id="street" type="text" value={formData.street} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="barangay">Barangay</Label>
              <Input id="barangay" type="text" value={formData.barangay} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" type="text" value={formData.city} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={formData.postalCode} onChange={handleChange} />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={() => onAdd(formData)} className="w-full">Create Address</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;
