import React, { useState } from 'react';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { Button } from '@src/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { DialogHeader, DialogDescription, DialogTitle, Dialog, DialogContent } from '@src/components/ui/dialog';
import { Form } from '../ui/form';
import { signInWithEmailAndPassword } from '@src/supabase/actions';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

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

  const handleLogin = async () => {
    const { email, password } = formData;
    const result = await signInWithEmailAndPassword(email, password);
    console.log(result);
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
          <Input id="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} />
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
        <Button onClick={handleLogin}>Login</Button>
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