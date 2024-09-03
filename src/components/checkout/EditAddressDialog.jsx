import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogTitle } from "@src/components/ui/dialog";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Check, Pencil } from "lucide-react";
import { ScrollArea } from "@src/components/ui/scroll-area";

const EditAddressDialog = ({ open, onClose, address, onSave }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', street: '', baranggay: '', city: '', postal_code: '' });
    const [editableFields, setEditableFields] = useState({
      name: false,
      address: false,
      phone: false,
      street: false,
      baranggay: false,
      city: false,
      postal_code: false,
    });
  
    useEffect(() => {
      if (address) {
        setFormData(address);
      } else {
        setFormData({ name: '', phone: '', street: '', baranggay: '', city: '', postal_code: '' });
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
  
    const handleSubmit = () => {
      onSave(formData);
      setEditableFields({ name: false, phone: false, street: false, baranggay: false, city: false, postal_code: false });
      onClose();
    };

  if (!address) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="">
        <DialogTitle className="mb-2">Edit Details</DialogTitle>
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
                  Baranggay
              </label>
              <div className="flex items-start gap-2">
                  <Input
                      name="baranggay"
                      value={formData.baranggay}
                      onChange={handleChange}
                      placeholder="Baranggay"
                      readOnly={!editableFields.baranggay}
                      className={`mb-4 ${editableFields.baranggay ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                  />
                  <Button onClick={() => handleEditClick('baranggay')}>
                      {editableFields.baranggay ? <Check size={16} /> : <Pencil size={16} />}
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
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      readOnly={!editableFields.postal_code}
                      className={`mb-4 ${editableFields.postal_code ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                  />
                  <Button onClick={() => handleEditClick('postal_code')}>
                      {editableFields.postal_code ? <Check size={16} /> : <Pencil size={16} />}
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
