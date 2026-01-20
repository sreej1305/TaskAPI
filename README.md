# TaskAPI

A production-ready AI full-stack web application built with React Router, Vite, and Hono.

## Features

- **Authentication**: Secure JWT-based auth with Argon2 hashing.
- **REST API**: Complete CRUD operations and role-based access control.
- **Modern Stack**: React 18, TailwindCSS, and PostgreSQL (Neon).

## Getting Started

### Prerequisites

- Node.js (v20+)
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm run start
   ```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsreej1305%2FTaskAPI)

1. Click the button above.
2. Ensure usage of `npm install --legacy-peer-deps`.
3. Set your environment variables (`DATABASE_URL`, `AUTH_SECRET`).

## License

MIT
