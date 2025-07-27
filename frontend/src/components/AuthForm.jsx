import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("vendor"); // Default to 'vendor' (Customer)
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const url = isSignup
      ? "http://127.0.0.1:8000/api/users/signup/"
      : "http://127.0.0.1:8000/api/users/login/";

    // CORRECTED: Payload for signup now includes the userType
    const payload = isSignup
      ? { fullName, email, password, userType }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An error occurred.");
      }

      localStorage.setItem("authToken", data.token);

      // --- CORRECTED: Role-based redirection ---
      if (isSignup) {
        // After signup, a vendor (customer) goes to the homepage, a supplier goes to their dashboard.
        if (userType === 'supplier') {
            navigate("/dashboard");
        } else {
            navigate("/Vendorhomepage");
        }
      } else {
        // After login, redirect based on the user_type from the API response
        if (data.user_type === 'supplier') {
          navigate("/dashboard");
        } else {
          navigate("/Vendorhomepage");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden w-full max-w-5xl min-h-[600px]">
        {/* Left Panel */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-500 to-indigo-600 text-white items-center justify-center p-12 w-1/2">
           <div className="text-center space-y-4">
             <h2 className="text-5xl font-bold">
               {isSignup ? "Create Your Account" : "Welcome Back!"}
             </h2>
             <p className="text-lg text-blue-100">
               {isSignup ? "Join our community of vendors and suppliers." : "Happy to see you again."}
             </p>
           </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            {isSignup ? "Sign Up" : "Login"}
          </h3>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {isSignup && (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg" />
                </div>
                {/* --- MODIFIED: User Type Selector now uses radio buttons and is inside the form --- */}
                <div className="flex justify-around p-2 bg-gray-100 rounded-md">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                    <input type="radio" name="userType" value="vendor" checked={userType === 'vendor'} onChange={(e) => setUserType(e.target.value)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    I am a Vendor
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                    <input type="radio" name="userType" value="supplier" checked={userType === 'supplier'} onChange={(e) => setUserType(e.target.value)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    I am a Supplier
                  </label>
                </div>
              </>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg" />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg" />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 text-lg rounded-md font-semibold transition">
              {isSignup ? "Create Account" : "Login"}
            </button>
          </form>
          <p className="mt-8 text-base text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  className="text-indigo-500 hover:underline font-semibold"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  className="text-indigo-500 hover:underline font-semibold"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
