import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Mail, Lock, User } from "lucide-react";
import useSignUpWithEmailAndPassword from "@/hooks/useSignUpWithEmailAndPassword";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { loading, error, signup } = useSignUpWithEmailAndPassword();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-email"
              placeholder="m@example.com"
              type="email"
              className="pl-10"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-username"
              type="text"
              className="pl-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4" disabled={loading}>
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}
