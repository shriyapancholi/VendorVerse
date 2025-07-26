import React from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-pink-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden w-full max-w-5xl min-h-[600px]">
        {/* Left Panel */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center p-12 w-1/2">
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
        <div className="flex flex-col justify-center items-center w-1/2 p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            {isSignup ? "Create Account" : "Login"}
          </h3>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {isSignup && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-800 text-lg"
              />
            </div>

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