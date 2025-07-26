import React from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate and authenticate here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Panel */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center p-10 md:w-5/12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">
              {isSignup ? "Welcome!" : "Welcome Back!"}
            </h2>
            <p className="text-sm text-blue-100">
              {isSignup ? "Let's get you started!" : "Happy to see you again"}
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-10 md:w-7/12 w-full space-y-6">
          <h3 className="text-2xl font-semibold text-center text-gray-800">
            {isSignup ? "Create Account" : "Login"}
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-base"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-base"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md font-semibold transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
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
          </div>
        </div>
      </div>
    </div>
  );
}
