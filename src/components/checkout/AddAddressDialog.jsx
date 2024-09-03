import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@src/components/ui/dialog";
import { Button } from "@src/components/ui/button";
import { Label } from "@src/components/ui/label";
import { Input } from "@src/components/ui/input";
import { ScrollArea } from "@src/components/ui/scroll-area";

const AddAddressDialog = ({ open, onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    street: '',
    baranggay: '',
    city: '',
    postal_code: '',

  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      
      <DialogContent>
        <DialogTitle>Add New Address</DialogTitle>
        <ScrollArea className="space-y-2 max-h-[350px] sm:max-h-full">
          <div className="px-1">
            <div className="space-y-1">
              <Label htmlFor="name">Recepient Name</Label>
              <Input id="name" type="text" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-1">
            <Label htmlFor="number">Phone Number</Label>
              <Input id="number" type="number" value={formData.number} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="street">Street</Label>
              <Input id="street" type="text" value={formData.street} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="baranggay">Baranggay</Label>
              <Input id="baranggay" type="text" value={formData.baranggay} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" type="text" value={formData.city} onChange={handleChange} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input id="postal_code" type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={formData.postal_code} onChange={handleChange} />
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter>
            <Button onClick={onClose} className="w-full">Create Address</Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  );
};

export default AddAddressDialog;
