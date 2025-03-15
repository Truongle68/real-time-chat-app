import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import {Link} from 'react-router-dom'
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if(!formData.email) return toast.error("Email is required!")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format!")
    if(!formData.password) return toast.error("Password is required!")
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters!")

    return true
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const validated = validateForm();

    if(validated === true) login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {" "}
          {/* margin top 2rem except the first one */}
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
                        group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Sign in to your account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="lable-text font-medium">Email</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Mail className ="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="johndoe11@gmail.com"
                  className={`input input-bordered w-full pl-10`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="lable-text font-medium">Password</span>
              </label>
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className ="size-5 text-base-content/40" />
                </div>
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  placeholder="12345678"
                  className={`input input-bordered w-full pl-10`}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                    onClick={()=>setShowPassword(!showPassword)}
                >
                    {showPassword ? 
                    <Eye className="size-5 text-base-content/40"/> : 
                    <EyeOff className="size-5 text-base-content/40"/>}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                {isLoggingIn ? 
               <>
                <Loader2 className="size-5 animate-spin"/>
                ...loading
               </>  :
               "Sign in"
              }
            </button>
            <div className="text-center">
              <p className="text-base-content/60">
                Don&apos;t have an account?{" "}
                <Link to={'/signup'} className="text-sm link link-primary">
                  Create account
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title = "Welcome back!"
        subtitle = "Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;

