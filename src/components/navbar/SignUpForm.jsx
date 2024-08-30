import React, { useState } from 'react';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { Button } from '@src/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { DialogHeader, DialogDescription, DialogTitle } from '@src/components/ui/dialog';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col gap-4 py-4 min-h-[460px]">
      <DialogHeader>
        <DialogTitle>SignUp</DialogTitle>
        <DialogDescription>
          Create a new account by providing your details.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <div className="relative">
            <Input id="confirm-password" type={showConfirmPassword ? 'text' : 'password'} />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      <Button>Create Account</Button>
    </div>
  );
};

export default SignUpForm;