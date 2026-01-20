import { Shield, ArrowLeft, Code } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                TaskAPI Documentation
              </h1>
            </div>
            <a
              href="/"
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              API Documentation
            </h2>
            <p className="text-gray-600">
              Complete reference for the Task Management REST API
            </p>
          </div>

          {/* Authentication */}
          <section className="mb-12">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Authentication
            </h3>
            <p className="mb-4 text-gray-600">
              All protected endpoints require a JWT token in the Authorization
              header:
            </p>
            <div className="rounded-lg bg-gray-900 p-4">
              <code className="text-sm text-green-400">
                Authorization: Bearer YOUR_JWT_TOKEN
              </code>
            </div>
          </section>

          {/* Register */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-green-100 px-3 py-1 font-mono text-sm font-semibold text-green-700">
                POST
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                /api/v1/auth/register
              </h3>
            </div>
            <p className="mb-4 text-gray-600">Register a new user account</p>

            <h4 className="mb-2 font-semibold text-gray-900">Request Body:</h4>
            <div className="mb-4 rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe" // optional
}`}
              </pre>
            </div>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (201):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "created_at": "2026-01-19T10:00:00.000Z"
  }
}`}
              </pre>
            </div>
          </section>

          {/* Login */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-green-100 px-3 py-1 font-mono text-sm font-semibold text-green-700">
                POST
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                /api/v1/auth/login
              </h3>
            </div>
            <p className="mb-4 text-gray-600">
              Authenticate and receive a JWT token
            </p>

            <h4 className="mb-2 font-semibold text-gray-900">Request Body:</h4>
            <div className="mb-4 rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "email": "user@example.com",
  "password": "password123"
}`}
              </pre>
            </div>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (200):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "created_at": "2026-01-19T10:00:00.000Z"
  }
}`}
              </pre>
            </div>
          </section>

          {/* Get Current User */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-blue-100 px-3 py-1 font-mono text-sm font-semibold text-blue-700">
                GET
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                /api/v1/auth/me
              </h3>
            </div>
            <p className="mb-4 text-gray-600">Get current authenticated user</p>

            <h4 className="mb-2 font-semibold text-gray-900">Headers:</h4>
            <div className="mb-4 rounded-lg bg-gray-900 p-4">
              <code className="text-sm text-green-400">
                Authorization: Bearer YOUR_JWT_TOKEN
              </code>
            </div>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (200):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "created_at": "2026-01-19T10:00:00.000Z"
  }
}`}
              </pre>
            </div>
          </section>

          {/* List Tasks */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-blue-100 px-3 py-1 font-mono text-sm font-semibold text-blue-700">
                GET
              </span>
              <h3 className="text-xl font-bold text-gray-900">/api/v1/tasks</h3>
            </div>
            <p className="mb-4 text-gray-600">
              Get all tasks for the authenticated user
            </p>

            <h4 className="mb-2 font-semibold text-gray-900">
              Query Parameters:
            </h4>
            <div className="mb-4 rounded-lg bg-gray-50 p-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <code className="rounded bg-gray-200 px-2 py-1">status</code>{" "}
                  - Filter by status (pending, in_progress, completed)
                </li>
                <li>
                  <code className="rounded bg-gray-200 px-2 py-1">
                    priority
                  </code>{" "}
                  - Filter by priority (low, medium, high)
                </li>
              </ul>
            </div>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (200):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "tasks": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Complete project",
      "description": "Finish the backend API",
      "status": "in_progress",
      "priority": "high",
      "due_date": "2026-01-25T00:00:00.000Z",
      "created_at": "2026-01-19T10:00:00.000Z",
      "updated_at": "2026-01-19T10:00:00.000Z"
    }
  ],
  "count": 1
}`}
              </pre>
            </div>
          </section>

          {/* Create Task */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-green-100 px-3 py-1 font-mono text-sm font-semibold text-green-700">
                POST
              </span>
              <h3 className="text-xl font-bold text-gray-900">/api/v1/tasks</h3>
            </div>
            <p className="mb-4 text-gray-600">Create a new task</p>

            <h4 className="mb-2 font-semibold text-gray-900">Request Body:</h4>
            <div className="mb-4 rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "title": "Complete project",
  "description": "Finish the backend API", // optional
  "status": "pending", // optional: pending, in_progress, completed
  "priority": "medium", // optional: low, medium, high
  "due_date": "2026-01-25" // optional
}`}
              </pre>
            </div>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (201):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "title": "Complete project",
    "description": "Finish the backend API",
    "status": "pending",
    "priority": "medium",
    "due_date": "2026-01-25T00:00:00.000Z",
    "created_at": "2026-01-19T10:00:00.000Z",
    "updated_at": "2026-01-19T10:00:00.000Z"
  }
}`}
              </pre>
            </div>
          </section>

          {/* Update Task */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-yellow-100 px-3 py-1 font-mono text-sm font-semibold text-yellow-700">
                PUT
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                /api/v1/tasks/:id
              </h3>
            </div>
            <p className="mb-4 text-gray-600">Update an existing task</p>

            <h4 className="mb-2 font-semibold text-gray-900">
              Request Body (all fields optional):
            </h4>
            <div className="mb-4 rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "priority": "high",
  "due_date": "2026-01-30"
}`}
              </pre>
            </div>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (200):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "message": "Task updated successfully",
  "task": { /* updated task object */ }
}`}
              </pre>
            </div>
          </section>

          {/* Delete Task */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-red-100 px-3 py-1 font-mono text-sm font-semibold text-red-700">
                DELETE
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                /api/v1/tasks/:id
              </h3>
            </div>
            <p className="mb-4 text-gray-600">Delete a task</p>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (200):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "message": "Task deleted successfully"
}`}
              </pre>
            </div>
          </section>

          {/* Admin Endpoint */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-blue-100 px-3 py-1 font-mono text-sm font-semibold text-blue-700">
                GET
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                /api/v1/admin/users
              </h3>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                ADMIN ONLY
              </span>
            </div>
            <p className="mb-4 text-gray-600">
              Get all users (requires admin role)
            </p>

            <h4 className="mb-2 font-semibold text-gray-900">
              Response (200):
            </h4>
            <div className="rounded-lg bg-gray-900 p-4">
              <pre className="text-sm text-gray-300">
                {`{
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "full_name": "John Doe",
      "role": "user",
      "task_count": 5,
      "created_at": "2026-01-19T10:00:00.000Z"
    }
  ],
  "count": 1
}`}
              </pre>
            </div>
          </section>

          {/* Error Responses */}
          <section>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Error Responses
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-gray-900">
                  400 Bad Request
                </h4>
                <div className="rounded-lg bg-gray-900 p-4">
                  <pre className="text-sm text-gray-300">
                    {`{
  "error": "Validation error message"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-gray-900">
                  401 Unauthorized
                </h4>
                <div className="rounded-lg bg-gray-900 p-4">
                  <pre className="text-sm text-gray-300">
                    {`{
  "error": "Unauthorized - Invalid or expired token"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-gray-900">
                  403 Forbidden
                </h4>
                <div className="rounded-lg bg-gray-900 p-4">
                  <pre className="text-sm text-gray-300">
                    {`{
  "error": "Forbidden - Admin access required"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-gray-900">
                  404 Not Found
                </h4>
                <div className="rounded-lg bg-gray-900 p-4">
                  <pre className="text-sm text-gray-300">
                    {`{
  "error": "Resource not found"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
