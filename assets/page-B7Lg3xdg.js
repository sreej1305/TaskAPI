import"./index-BBR7LY95.js";import{o as e,p as l}from"./chunk-EPOLDU6W-z78irOPe.js";import{R as n}from"./createLucideIcon-IHTiy8iX.js";import{S as d}from"./shield-C4UE4Bst.js";import{A as i}from"./arrow-left-BpC4av4g.js";if(typeof window<"u"){const r={};globalThis.process??={};const s=globalThis.process.env??{};globalThis.process.env=new Proxy(Object.assign({},r,s),{get(a,t){return t in a?a[t]:void 0},has(){return!0}})}function c(){return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 to-blue-50",children:[e.jsx("header",{className:"border-b bg-white/80 backdrop-blur-sm",children:e.jsx("div",{className:"mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{className:"h-8 w-8 text-blue-600"}),e.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"TaskAPI Documentation"})]}),e.jsxs("a",{href:"/",className:"flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50",children:[e.jsx(i,{className:"h-4 w-4"}),"Back to Home"]})]})})}),e.jsx("main",{className:"mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"rounded-xl border border-gray-200 bg-white p-8 shadow-sm",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h2",{className:"mb-2 text-3xl font-bold text-gray-900",children:"API Documentation"}),e.jsx("p",{className:"text-gray-600",children:"Complete reference for the Task Management REST API"})]}),e.jsxs("section",{className:"mb-12",children:[e.jsx("h3",{className:"mb-4 text-2xl font-bold text-gray-900",children:"Authentication"}),e.jsx("p",{className:"mb-4 text-gray-600",children:"All protected endpoints require a JWT token in the Authorization header:"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("code",{className:"text-sm text-green-400",children:"Authorization: Bearer YOUR_JWT_TOKEN"})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-green-100 px-3 py-1 font-mono text-sm font-semibold text-green-700",children:"POST"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/auth/register"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Register a new user account"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Request Body:"}),e.jsx("div",{className:"mb-4 rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe" // optional
}`})}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (201):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "created_at": "2026-01-19T10:00:00.000Z"
  }
}`})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-green-100 px-3 py-1 font-mono text-sm font-semibold text-green-700",children:"POST"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/auth/login"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Authenticate and receive a JWT token"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Request Body:"}),e.jsx("div",{className:"mb-4 rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "email": "user@example.com",
  "password": "password123"
}`})}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (200):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "created_at": "2026-01-19T10:00:00.000Z"
  }
}`})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-blue-100 px-3 py-1 font-mono text-sm font-semibold text-blue-700",children:"GET"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/auth/me"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Get current authenticated user"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Headers:"}),e.jsx("div",{className:"mb-4 rounded-lg bg-gray-900 p-4",children:e.jsx("code",{className:"text-sm text-green-400",children:"Authorization: Bearer YOUR_JWT_TOKEN"})}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (200):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user",
    "created_at": "2026-01-19T10:00:00.000Z"
  }
}`})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-blue-100 px-3 py-1 font-mono text-sm font-semibold text-blue-700",children:"GET"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/tasks"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Get all tasks for the authenticated user"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Query Parameters:"}),e.jsx("div",{className:"mb-4 rounded-lg bg-gray-50 p-4",children:e.jsxs("ul",{className:"space-y-2 text-sm text-gray-700",children:[e.jsxs("li",{children:[e.jsx("code",{className:"rounded bg-gray-200 px-2 py-1",children:"status"})," ","- Filter by status (pending, in_progress, completed)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"rounded bg-gray-200 px-2 py-1",children:"priority"})," ","- Filter by priority (low, medium, high)"]})]})}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (200):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
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
}`})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-green-100 px-3 py-1 font-mono text-sm font-semibold text-green-700",children:"POST"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/tasks"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Create a new task"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Request Body:"}),e.jsx("div",{className:"mb-4 rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "title": "Complete project",
  "description": "Finish the backend API", // optional
  "status": "pending", // optional: pending, in_progress, completed
  "priority": "medium", // optional: low, medium, high
  "due_date": "2026-01-25" // optional
}`})}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (201):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
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
}`})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-yellow-100 px-3 py-1 font-mono text-sm font-semibold text-yellow-700",children:"PUT"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/tasks/:id"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Update an existing task"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Request Body (all fields optional):"}),e.jsx("div",{className:"mb-4 rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "priority": "high",
  "due_date": "2026-01-30"
}`})}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (200):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "message": "Task updated successfully",
  "task": { /* updated task object */ }
}`})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-red-100 px-3 py-1 font-mono text-sm font-semibold text-red-700",children:"DELETE"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/tasks/:id"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Delete a task"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (200):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "message": "Task deleted successfully"
}`})})]}),e.jsxs("section",{className:"mb-12",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-3",children:[e.jsx("span",{className:"rounded bg-blue-100 px-3 py-1 font-mono text-sm font-semibold text-blue-700",children:"GET"}),e.jsx("h3",{className:"text-xl font-bold text-gray-900",children:"/api/v1/admin/users"}),e.jsx("span",{className:"rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700",children:"ADMIN ONLY"})]}),e.jsx("p",{className:"mb-4 text-gray-600",children:"Get all users (requires admin role)"}),e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"Response (200):"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
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
}`})})]}),e.jsxs("section",{children:[e.jsx("h3",{className:"mb-4 text-2xl font-bold text-gray-900",children:"Error Responses"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"400 Bad Request"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "error": "Validation error message"
}`})})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"401 Unauthorized"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "error": "Unauthorized - Invalid or expired token"
}`})})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"403 Forbidden"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "error": "Forbidden - Admin access required"
}`})})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mb-2 font-semibold text-gray-900",children:"404 Not Found"}),e.jsx("div",{className:"rounded-lg bg-gray-900 p-4",children:e.jsx("pre",{className:"text-sm text-gray-300",children:`{
  "error": "Resource not found"
}`})})]})]})]})]})})]})}if(typeof window<"u"){const r={};globalThis.process??={};const s=globalThis.process.env??{};globalThis.process.env=new Proxy(Object.assign({},r,s),{get(a,t){return t in a?a[t]:void 0},has(){return!0}})}const g=l(function(s){return e.jsx(n,{children:e.jsx(c,{...s})})});export{g as default};
