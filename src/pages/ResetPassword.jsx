import Mars from "@src/assets/images/Planets/mars.png";
import backgroundImage from "@src/assets/images/background-image.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Button } from '@src/components/ui/button';
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { supabase } from "@src/supabase/config";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoggedInOnly from "@src/layouts/LoggedInOnly";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    if (data) {
      toast.success("Password updated successfully!");
    } else if (error) {
      toast.error("There was an error updating your password.");
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("Password recovery initiated");
      }
    });
  }, []);

  return (
    <LoggedInOnly forUser={true} forAdmin={true}>
      <div
        className="relative overflow-hidden bg-cover bg-center min-h-full flex justify-center items-center navbar-spacing w-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute w-fit lg:top-[-50px] lg:right-[-100px] top-[-50px] right-[-150px]">
          <img
            src={Mars}
            alt="Mars"
            className="object-contain w-full h-full lg:max-w-[600px] md:max-w-[400px] max-w-[300px] "
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-55"></div>
        <Card className="w-[350px] z-10 h-full">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your new password below to reset it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </LoggedInOnly>
  );
};

export default ResetPassword;
