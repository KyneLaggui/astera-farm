import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@src/components/ui/dialog";
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { Button } from '@src/components/ui/button';
import { Check, EyeIcon, EyeOffIcon, Pencil } from 'lucide-react';

const EditProfileDialog = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    username: 'mordecool',
    email: 'jason@gmail.com',
    password: 'jasoncool',
  });

  const [editableFields, setEditableFields] = useState({
    username: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleEditClick = (field) => {
    setEditableFields(prevState => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const getInputClass = (isEditable) => {
    return isEditable 
      ? "border p-2 focus:outline-none"
      : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"; 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px] p-4">
        <DialogTitle>My Profile</DialogTitle>
        <DialogDescription>View and update your personal details here.</DialogDescription>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <div className="flex items-center space-x-2">
              <Input 
                id="username" 
                type="text" 
                value={profile.username} 
                onChange={handleChange} 
                readOnly={!editableFields.username} 
                className={getInputClass(editableFields.username)}
              />
              <Button onClick={() => handleEditClick('username')}>
                {editableFields.username ? <Check /> : <Pencil />}
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={profile.email} 
              readOnly 
              className="border-none p-2 bg-transparent focus:outline-none cursor-default focus-visible:ring-transparent"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative flex items-center space-x-2">
                <div className="relative w-full">
                    <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            value={profile.password} 
                            onChange={handleChange} 
                            readOnly={!editableFields.password} 
                            className={`${getInputClass(editableFields.password)} pr-10`} 
                        />
                    {editableFields.password && (
                        <button 
                        type="button" 
                        className="absolute inset-y-0 right-1 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    )}
                </div>
              <Button onClick={() => handleEditClick('password')}>
                {editableFields.password ? <Check /> : <Pencil />}
              </Button>
            </div>
          </div>
          <Button type="submit" onClick={onClose}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;