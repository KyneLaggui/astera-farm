import React, { useState } from 'react';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { Button } from '@src/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { DialogHeader, DialogDescription, DialogTitle, Dialog, DialogContent } from '@src/components/ui/dialog';
import { Form } from '../ui/form';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openForgotPasswordDialog = () => {
    setIsForgotPasswordOpen(true);
  };

  const closeForgotPasswordDialog = () => {
    setIsForgotPasswordOpen(false);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    closeForgotPasswordDialog();
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Access your account by entering your credentials.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" />
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
      </div>
      <div className="flex justify-between items-center">
        <Button>Login</Button>
        <a
          className="text-sm text-yellow hover:underline cursor-pointer"
          onClick={openForgotPasswordDialog}
        >
          Forgot Password?
        </a>
      </div>

      <Dialog open={isForgotPasswordOpen} onOpenChange={closeForgotPasswordDialog}>
        <DialogContent className="w-[400px] p-4">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email address to reset your password.
            </DialogDescription>
          </DialogHeader>
          <Form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="forgot-email">Email</Label>
              <Input
                id="forgot-email"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginForm;