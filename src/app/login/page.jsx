"use client";

import { useState } from "react";
import { Shield, AlertCircle, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login error:", err);
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
            Welcome Back
          </h1>
          <p className="mt-3 text-gray-600 font-medium">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-white p-8 shadow-2xl backdrop-blur-sm transition-all hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            </div>

            {error && (
              <div className="animate-shake flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 p-4 shadow-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                <span className="text-sm font-semibold text-red-700">
                  {error}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="relative z-10">
                {loading ? "Signing In..." : "Sign In"}
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text transition-all hover:scale-105 inline-block"
            >
              Create one
            </a>
          </div>

          <div className="mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <p className="text-xs font-black uppercase tracking-wide text-blue-900">
                Demo Credentials
              </p>
            </div>
            <p className="mt-2 text-sm font-semibold text-blue-700">
              👤 User: user@example.com / user123
            </p>
            <p className="text-sm font-semibold text-purple-700">
              🔑 Admin: admin@example.com / admin123
            </p>
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
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
