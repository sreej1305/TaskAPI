import {
  ArrowRight,
  Shield,
  Database,
  Zap,
  Code,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="group flex items-center gap-2 transition-transform hover:scale-105">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2 shadow-lg transition-all group-hover:shadow-xl group-hover:rotate-12">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                TaskAPI
              </h1>
            </div>
            <div className="flex gap-3">
              <a
                href="/chat"
                className="flex items-center gap-2 rounded-xl border-2 border-purple-200 bg-gradient-to-r from-[#FFB8D9] to-[#E6CBF7] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4" />
                Chat Assistant
              </a>
              <a
                href="/register"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </a>
              <a
                href="/login"
                className="rounded-xl border-2 border-purple-200 bg-white px-6 py-2.5 text-sm font-semibold text-purple-700 shadow-md transition-all hover:scale-105 hover:border-purple-300 hover:bg-purple-50 hover:shadow-lg"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex animate-float items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 shadow-xl">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-bold text-white">
              Production Ready
            </span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 sm:text-6xl lg:text-7xl">
            Scalable REST API
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              with Authentication
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-700 font-medium">
            A production-ready backend system with JWT authentication,
            role-based access control, and comprehensive CRUD operations.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/register"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-110 hover:shadow-3xl"
            >
              Try Demo
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/docs"
              className="group flex items-center gap-2 rounded-xl border-2 border-purple-200 bg-white px-8 py-4 text-lg font-bold text-purple-700 shadow-xl transition-all hover:scale-110 hover:border-purple-400 hover:bg-purple-50 hover:shadow-2xl"
            >
              <Code className="h-5 w-5" />
              API Docs
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-2xl border-2 border-blue-100 bg-white p-8 shadow-xl transition-all hover:scale-105 hover:border-blue-300 hover:shadow-2xl">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Secure Authentication
            </h3>
            <p className="text-gray-600 leading-relaxed">
              JWT-based authentication with password hashing using Argon2.
              Secure token handling and session management.
            </p>
          </div>

          <div className="group rounded-2xl border-2 border-green-100 bg-white p-8 shadow-xl transition-all hover:scale-105 hover:border-green-300 hover:shadow-2xl">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Role-Based Access
            </h3>
            <p className="text-gray-600 leading-relaxed">
              User and admin roles with protected endpoints. Fine-grained access
              control for different user types.
            </p>
          </div>

          <div className="group rounded-2xl border-2 border-purple-100 bg-white p-8 shadow-xl transition-all hover:scale-105 hover:border-purple-300 hover:shadow-2xl">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg transition-all group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              RESTful CRUD APIs
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Complete CRUD operations with validation, error handling, and
              proper HTTP status codes.
            </p>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h3 className="mb-8 text-center text-4xl font-black text-gray-900">
          API Endpoints
        </h3>
        <div className="overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-2xl">
          <div className="divide-y divide-purple-100">
            <div className="grid grid-cols-12 gap-4 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 text-sm font-black text-purple-700">
              <div className="col-span-2">METHOD</div>
              <div className="col-span-6">ENDPOINT</div>
              <div className="col-span-4">DESCRIPTION</div>
            </div>
            {[
              {
                method: "POST",
                color: "green",
                endpoint: "/api/v1/auth/register",
                desc: "Register new user",
              },
              {
                method: "POST",
                color: "green",
                endpoint: "/api/v1/auth/login",
                desc: "User login",
              },
              {
                method: "GET",
                color: "blue",
                endpoint: "/api/v1/auth/me",
                desc: "Get current user",
              },
              {
                method: "GET",
                color: "blue",
                endpoint: "/api/v1/tasks",
                desc: "List all tasks",
              },
              {
                method: "POST",
                color: "green",
                endpoint: "/api/v1/tasks",
                desc: "Create new task",
              },
              {
                method: "PUT",
                color: "yellow",
                endpoint: "/api/v1/tasks/:id",
                desc: "Update task",
              },
              {
                method: "DELETE",
                color: "red",
                endpoint: "/api/v1/tasks/:id",
                desc: "Delete task",
              },
              {
                method: "GET",
                color: "blue",
                endpoint: "/api/v1/admin/users",
                desc: "List users (Admin)",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 px-6 py-4 text-sm transition-all hover:bg-purple-50"
              >
                <div className="col-span-2">
                  <span
                    className={`rounded-lg bg-${item.color}-100 px-3 py-1.5 font-mono font-bold text-${item.color}-700 shadow-sm`}
                  >
                    {item.method}
                  </span>
                </div>
                <div className="col-span-6 font-mono font-semibold text-gray-900">
                  {item.endpoint}
                </div>
                <div className="col-span-4 font-medium text-gray-600">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-200 bg-white/80 backdrop-blur-md py-8 mt-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
          <p className="font-medium">
            Full Stack Application - Built with ❤️ using Next.js & PostgreSQL
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
