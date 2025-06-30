import Button from "../components/Button";
import FormField from "../components/FormField";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const SignUp = ({ navigateOnSuccess }) => {
  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { registerUser } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Registering user:");
      await registerUser({ username, email, password });
      console.log("Jerejrk")
      navigator(navigateOnSuccess);
    } catch (error) {
      console.error("Signup failed:", error);
      const data = error.response?.data;
      const newErrors = {};
      if (data?.errors) {
        for (const field in data.errors) {
          newErrors[field] = data.errors[field].message;
        }
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col bg-primary text-white p-0">
            <div className="w-full">
                <img
                src="/photo.jpg"
                alt="Sign up"
                className="w-full h-auto object-cover"
                />
            </div>

            {/* Remaining space — center text here */}
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Welcome Back!</h2>
                <p className="text-lg">
                    Sign up to access your dashboard and manage your content.
                </p>
                </div>
            </div>
        </div>



        {/* Right Form Section */}
        <div className="p-6 sm:p-10 bg-gray-100">
          <h2 className="text-3xl font-bold text-text text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-5">
            <FormField
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />

            <FormField
              type="email"
              label="Email"
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

            <FormField
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />

            <div className="text-sm text-muted text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline hover:text-primaryDark transition"
              >
                Log in
              </Link>
            </div>

            <Button text="Sign Up" isSubmit={true} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
