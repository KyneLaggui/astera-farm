import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@src/components/ui/dialog";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Check, Pencil } from "lucide-react";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { supabase } from "@src/supabase/config";

const EditAddressDialog = ({ open, onClose, address, onSave }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', street: '', barangay: '', city: '', postalCode: '' });
    const [editableFields, setEditableFields] = useState({
      name: false,
      address: false,
      phoneNumber: false,
      street: false,
      barangay: false,
      city: false,
      postalCode: false,
    });
  
    useEffect(() => {
      if (address) {
        setFormData(address);
      } else {
        setFormData({ name: '', phone: '', street: '', barangay: '', city: '', postalCode: '' });
      }
    }, [address]);
  
    const handleEditClick = (field) => {
      setEditableFields((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async() => {
      console.log(formData)
      const editResult = await supabase
        .from('shipping_address')
        .update({
          name: formData.name,
          phone_number: formData.phoneNumber,
          street: formData.street,
          barangay: formData.barangay,
          city: formData.city,
          postal_code: formData.postalCode,
        })
        .eq('id', formData.id)
        .select()
        .single()

      if (!editResult.error) {
        setEditableFields({ name: false, phoneNumber: false, street: false, barangay: false, city: false, postalCode: false });
        onClose();
      }     
    };

  if (!address) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="">
        <DialogTitle>Edit Details</DialogTitle>
        <DialogDescription>Update your address information to ensure accurate delivery and communication.</DialogDescription>
        <ScrollArea className="flex flex-col gap-4 overflow-y-auto max-h-[400px]">
            <div className="px-1">
              <div className="flex flex-col">
                  <label className="mb-2">
                      Name
                  </label>
                  <div className="flex items-start gap-2">
                      <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      readOnly={!editableFields.name}
                      className={`mb-4 ${editableFields.name ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                      />
                      <Button onClick={() => handleEditClick('name')}>
                      {editableFields.name ? <Check size={16} /> : <Pencil size={16} />}
                      </Button>
                  </div>
              </div>
              <div className="flex flex-col">
              <label className="mb-2">
                  Phone Number
              </label>
              <div className="flex items-start gap-2">
                  <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      readOnly={!editableFields.phone}
                      className={`mb-4 ${editableFields.phone ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                  />
                  <Button onClick={() => handleEditClick('phone')}>
                      {editableFields.phone ? <Check size={16} /> : <Pencil size={16} />}
                  </Button>
                  </div>
              </div>
              <div className="flex flex-col">
              <label className="mb-2">
                  Street
              </label>
              <div className="flex items-start gap-2">
                  <Input
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="Street"
                      readOnly={!editableFields.street}
                      className={`mb-4 ${editableFields.street ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                  />
                  <Button onClick={() => handleEditClick('street')}>
                      {editableFields.street ? <Check size={16} /> : <Pencil size={16} />}
                  </Button>
                  </div>
              </div>
              <div className="flex flex-col">
              <label className="mb-2">
                  barangay
              </label>
              <div className="flex items-start gap-2">
                  <Input
                      name="barangay"
                      value={formData.barangay}
                      onChange={handleChange}
                      placeholder="barangay"
                      readOnly={!editableFields.barangay}
                      className={`mb-4 ${editableFields.barangay ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                  />
                  <Button onClick={() => handleEditClick('barangay')}>
                      {editableFields.barangay ? <Check size={16} /> : <Pencil size={16} />}
                  </Button>
                  </div>
              </div>
              <div className="flex flex-col">
              <label className="mb-2">
                  City
              </label>
              <div className="flex items-start gap-2">
                  <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      readOnly={!editableFields.city}
                      className={`mb-4 ${editableFields.city ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                  />
                  <Button onClick={() => handleEditClick('city')}>
                      {editableFields.city ? <Check size={16} /> : <Pencil size={16} />}
                  </Button>
                  </div>
              </div>
              <div className="flex flex-col">
              <label className="mb-2">
                  Postal Code
              </label>
              <div className="flex items-start gap-2">
                  <Input
                      name="postalCode"
                      value={formData.postal_code}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      readOnly={!editableFields.postalCode}
                      className={`mb-4 ${editableFields.postalCode ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                  />
                  <Button onClick={() => handleEditClick('postalCode')}>
                      {editableFields.postalCode ? <Check size={16} /> : <Pencil size={16} />}
                  </Button>
                  </div>
              </div>
            </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">Save All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressDialog;
