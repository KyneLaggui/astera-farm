import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogContent, DialogFooter, DialogTitle } from "@src/components/ui/dialog";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Check, Pencil } from "lucide-react";

const EditAddressDialog = ({ open, onClose, address, onSave }) => {
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
  const [editableFields, setEditableFields] = useState({
    name: false,
    address: false,
    phone: false,
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    } else {
      setFormData({ name: '', address: '', phone: '' });
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
    setEditableFields({ name: false, address: false, phone: false });
    onClose();
  };

  if (!address) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogTitle className="mb-2">Edit Details</DialogTitle>
        <div className="flex flex-col gap-4">
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
              Address
            </label>
            <div className="flex items-start gap-2">
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  readOnly={!editableFields.address}
                  className={`mb-4 ${editableFields.address ? "border p-2 focus:outline-none" : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"}`}
                />
                <Button onClick={() => handleEditClick('address')}>
                  {editableFields.address ? <Check size={16} /> : <Pencil size={16} />}
                </Button>
              </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2">
              Phone
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
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">Save All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressDialog;
