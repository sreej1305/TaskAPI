"use client";

import { useState } from "react";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setFormData({ email: "", password: "", full_name: "" });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 animate-bounce-slow items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-black text-transparent">
            Create Account
          </h1>
          <p className="mt-3 text-gray-600 font-medium">
            Register to access the Task Management API
          </p>
        </div>

        <div className="rounded-2xl border-2 border-purple-200 bg-white p-8 shadow-2xl backdrop-blur-sm transition-all hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label
                htmlFor="full_name"
                className="block text-sm font-bold text-gray-700 transition-colors group-focus-within:text-purple-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="John Doe"
              />
            </div>

            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700 transition-colors group-focus-within:text-purple-600"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="you@example.com"
              />
            </div>

            <div className="group">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 transition-colors group-focus-within:text-purple-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100"
                placeholder="••••••••"
              />
              <p className="mt-2 text-xs font-medium text-gray-500">
                Must be at least 6 characters
              </p>
            </div>

            {error && (
              <div className="animate-shake flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 p-4 shadow-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                <span className="text-sm font-semibold text-red-700">
                  {error}
                </span>
              </div>
            )}

            {success && (
              <div className="animate-slide-in flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4 shadow-lg">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  Registration successful! Redirecting to login...
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="relative z-10">
                {loading ? "Creating Account..." : "Create Account"}
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text transition-all hover:scale-105 inline-block"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
