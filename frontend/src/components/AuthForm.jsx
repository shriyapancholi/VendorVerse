import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function AuthForm({ mode }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const [selectedRole, setSelectedRole] = useState("Supplier"); // default to buyer


  // --- STATE MANAGEMENT ---
  // State for each input field and for handling API errors
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // --- API SUBMISSION LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Determine the API endpoint based on the mode
    const url = isSignup
      ? "http://127.0.0.1:8000/api/users/signup/"
      : "http://127.0.0.1:8000/api/users/login/";

    // Prepare the data payload to send to the API
    const payload = isSignup
      ? { fullName, email, password }
      : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the server returns an error, use its message
        throw new Error(data.error || "An unexpected error occurred.");
      }

      // --- HANDLE SUCCESS ---
      // Store the token in localStorage to keep the user logged in
      localStorage.setItem("authToken", data.token);

      // Navigate to the correct page after a successful action
    if (isSignup) {
  navigate("/language");
} else {
  // INVERTED: buyer → /Vendorhomepage, vendor → /dashboard
      if (selectedRole === "Supplier") {
    navigate("/dashboard");
  } else {
  navigate("/Vendorhomepage");
  }
}

    } catch (err) {
      // --- HANDLE ERRORS ---
      // Display the error message from the backend to the user
      setError(err.message);
      console.error("Authentication error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden w-full max-w-5xl min-h-[600px]">
        {/* Left Panel */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-500 to-indigo-600 text-white items-center justify-center p-12 w-1/2">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold">
              {isSignup ? "Welcome!" : "Welcome Back!"}
            </h2>
            <p className="text-lg text-blue-100">
              {isSignup ? "Let’s get you started!" : "Happy to see you again"}
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            {isSignup ? "Create Account" : "Login"}
          </h3>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole("Supplier")}
              className={`px-4 py-2 rounded-md font-medium border ${selectedRole === "Supplier"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700"
                }`}
            >
              Supplier
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("vendor")}
              className={`px-4 py-2 rounded-md font-medium border ${selectedRole === "vendor"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700"
                }`}
            >
              Vendor
            </button>
          </div>


          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {isSignup && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg"
              />
            </div>

            {/* Display API errors here */}
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 text-lg rounded-md font-semibold transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="mt-8 text-base text-gray-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  className="text-indigo-500 hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  className="text-indigo-500 hover:underline"
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