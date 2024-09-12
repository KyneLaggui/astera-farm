import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@src/components/ui/dialog";
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { Button } from '@src/components/ui/button';
import { Check, EyeIcon, EyeOffIcon, Pencil } from 'lucide-react';
import { editProfile } from '@src/supabase/actions';
import FetchUserProfile from '@src/custom-hooks/fetchUserProfile';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@src/supabase/config';
import { toast } from 'react-toastify';

const EditProfileDialog = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [editableFields, setEditableFields] = useState({
    username: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { userData } = FetchUserProfile();
  const navigate = useNavigate();

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
  
  const handleEditPassword = async() => {
    const result = await supabase.auth.resetPasswordForEmail(profile.email, {
      redirectTo: 'http://localhost:5173/reset-password',
    })
    toast.success('Password reset link sent to your email.');
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, username } = profile;
    const result = await editProfile(email, username);
    if (result) {
      toast.success('Profile updated successfully!');
      onClose()      
    } else {
      toast.error('An error occurred when updating profile details. Please try again.');
    }
  }

  const getInputClass = (isEditable) => {
    return isEditable 
      ? "border p-2 focus:outline-none"
      : "border-none p-2 bg-transparent focus:outline-none focus-visible:ring-transparent cursor-text"; 
  };

  useEffect(() => {
    if (userData) {
      setProfile({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });
    }

  }, [userData])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[400px] p-4 flex flex-col gap-4" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogTitle>My Profile</DialogTitle>
        <DialogDescription>View and update your personal details here.</DialogDescription>
        <div className="flex flex-col gap-4">
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
                {editableFields.username ? <Check size={16} /> : <Pencil size={16} />}
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
              <Button onClick={handleEditPassword}>
                {editableFields.password ? <Check size={16} /> : <Pencil size={16} />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;