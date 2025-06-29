import Button from "../components/Button";
import FormField from "../components/FormField";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Login = ({ navigateOnSuccess }) => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { logUserIn } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      await logUserIn({ email, password });
      navigator(navigateOnSuccess);
    } catch (error) {
      setErrors({ password: error.response.data.message });
      return;
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="w-full max-w-4xl bg-surface rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex items-center justify-center bg-primary text-white p-10">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold">Welcome Back!</h2>
                    <p className="text-lg">Log in to access your dashboard and manage your content.</p>
                    {/* <img
                        src="/login-photo.svg" // Optional image (replace or remove)
                        alt="Login photo"
                        className="w-60 mx-auto mt-6"
                    /> */}
                </div>
            </div>
            <div className="p-8 sm:p-10 bg-gray-100">
                <h2 className="text-3xl font-bold text-text text-center mb-8">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <FormField
                    type="Email"
                    label="Username"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    />
                    <FormField
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    />
                    <div className="text-sm text-muted text-center">
                    <p>Don't have an account?{" "}
                        <Link to="/signup" className="text-primary font-semibold hover:underline hover:text-primaryDark transition">
                        Sign Up now
                        </Link>
                    </p>
                    </div>
                    <Button text="Login" isSubmit={true}/>
                </form>
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
