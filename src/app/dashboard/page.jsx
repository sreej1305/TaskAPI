"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Plus,
  LogOut,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  MessageCircle,
} from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(userData));
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/v1/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      console.error("Fetch tasks error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/v1/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks();
    } catch (err) {
      console.error("Delete task error:", err);
      alert(err.message);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/80 backdrop-blur-md shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="group flex items-center gap-2 transition-transform hover:scale-105">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-2 shadow-lg transition-all group-hover:shadow-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                TaskAPI
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-right shadow-md">
                <p className="text-sm font-bold text-gray-900">
                  {user?.full_name || user?.email}
                </p>
                <p className="text-xs font-semibold capitalize text-purple-600">
                  {user?.role}
                </p>
              </div>
              <a
                href="/chat"
                className="group flex items-center gap-2 rounded-xl border-2 border-[#FFB8D9] bg-gradient-to-r from-[#FFB8D9] to-[#E6CBF7] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
              >
                <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                Chat
              </a>
              {user?.role === "admin" && (
                <a
                  href="/admin"
                  className="group flex items-center gap-2 rounded-xl border-2 border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 shadow-md transition-all hover:scale-105 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg"
                >
                  <Users className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Admin Panel
                </a>
              )}
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition-all hover:scale-105 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-lg"
              >
                <LogOut className="h-4 w-4 transition-transform group-hover:scale-110" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-black text-transparent">
              My Tasks
            </h2>
            <p className="mt-2 text-gray-600 font-medium">
              Manage your tasks and track progress
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl"
          >
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            New Task
          </button>
        </div>

        {error && (
          <div className="mb-6 animate-shake rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 p-4 shadow-lg">
            <p className="font-semibold text-red-700">{error}</p>
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-purple-300 bg-white p-16 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
              <AlertCircle className="h-10 w-10 text-purple-600" />
            </div>
            <p className="text-lg font-semibold text-gray-600">
              No tasks yet. Create your first task to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className="group animate-slide-up rounded-2xl border-2 border-purple-100 bg-white p-6 shadow-xl transition-all hover:scale-102 hover:border-purple-300 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          task.status === "completed"
                            ? "bg-green-100"
                            : task.status === "in_progress"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                        }`}
                      >
                        {getStatusIcon(task.status)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {task.title}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold shadow-md transition-all group-hover:scale-110 ${getPriorityColor(
                          task.priority,
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p className="mt-3 text-gray-600 font-medium">
                        {task.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-4 text-sm font-semibold text-gray-500">
                      <span className="rounded-full bg-gray-100 px-3 py-1 capitalize">
                        {task.status.replace("_", " ")}
                      </span>
                      {task.due_date && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="group rounded-xl border-2 border-blue-200 bg-blue-50 p-3 text-blue-600 transition-all hover:scale-110 hover:border-blue-400 hover:bg-blue-100 hover:shadow-lg"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="group rounded-xl border-2 border-red-200 bg-red-50 p-3 text-red-600 transition-all hover:scale-110 hover:border-red-400 hover:bg-red-100 hover:shadow-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingTask) && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowCreateModal(false);
            setEditingTask(null);
          }}
          onSuccess={() => {
            setShowCreateModal(false);
            setEditingTask(null);
            fetchTasks();
          }}
        />
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

function TaskModal({ task, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
    priority: task?.priority || "medium",
    due_date: task?.due_date
      ? new Date(task.due_date).toISOString().split("T")[0]
      : "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const url = task ? `/api/v1/tasks/${task.id}` : "/api/v1/tasks";
      const method = task ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save task");
      }

      onSuccess();
    } catch (err) {
      console.error("Save task error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          {task ? "Edit Task" : "Create New Task"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
