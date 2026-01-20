import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Helper function to transform file path to Hono route path
function getHonoPath(filePath: string): { name: string; pattern: string }[] {
  // filePath comes from import.meta.glob keys, e.g., "../src/app/api/foo/route.js"
  // We want to extract "foo"

  // Normalize path separators if needed (glob usually returns forward slashes)
  const normalizedPath = filePath.replace(/\\/g, '/');

  // Remove prefix "../src/app/api" and suffix "route.js"
  // Note: import.meta.glob is relative to THIS file (__create/route-builder.ts)
  // so keys will look like "../src/app/api/..." 

  // We can just find the part after /api/
  const apiMarker = '/api/';
  const idx = normalizedPath.lastIndexOf(apiMarker);
  let relativePath = '';
  if (idx !== -1) {
    relativePath = normalizedPath.substring(idx + apiMarker.length);
  } else {
    // Fallback or root handling if needed
    console.warn(`Could not parse path ${filePath}`);
    return [];
  }

  // Remove /route.js or /route.ts
  relativePath = relativePath.replace(/\/route\.(js|ts)$/, '');

  // If it was just .../api/route.js, relativePath is now empty (or we explicitly handle it)
  // Let's refine logical extraction:
  // ../src/app/api/route.js -> "" -> root
  // ../src/app/api/users/route.js -> "users"

  if (relativePath === '') {
    return [{ name: 'root', pattern: '' }];
  }

  const parts = relativePath.split('/');

  const transformedParts = parts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
  return transformedParts;
}

// Import and register all routes
async function registerRoutes() {
  // Clear existing routes
  api.routes = [];

  // Use import.meta.glob to find routes. This works at build time.
  // Eager load to get the modules directly.
  const routes = import.meta.glob('../src/app/api/**/route.{js,ts}', { eager: true });

  // Sort by path length (descending) to handle nested routes correctly if needed
  // though Hono usually handles specific routes first if registered in order
  const routeEntries = Object.entries(routes).sort((a, b) => {
    // Sort by segment count descending to ensure specific routes come before wildcards if necessary?
    // Original logic was b.length - a.length (descending length)
    return b[0].length - a[0].length;
  });

  for (const [filePath, module] of routeEntries) {
    try {
      const route = module as any;

      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      for (const method of methods) {
        try {
          if (route[method]) {
            const parts = getHonoPath(filePath);
            const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
            const handler: Handler = async (c) => {
              const params = c.req.param();
              // In dev, we might want to reload, but import.meta.glob is static in build.
              // For hot reload in dev, we might rely on the side-effect code below.
              // But module reference here updates if HMR updates the module? 
              // With eager: true, it returns the module exports.
              // We'll just plain call it.
              return await route[method](c.req.raw, { params });
            };
            const methodLowercase = method.toLowerCase();
            // @ts-ignore
            if (api[methodLowercase]) {
              // @ts-ignore
              api[methodLowercase](honoPath, handler);
            }
          }
        } catch (error) {
          console.error(`Error registering route ${filePath} for method ${method}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error processing route file ${filePath}:`, error);
    }
  }
}

// Initial route registration
await registerRoutes();

// Hot reload routes in development
if (import.meta.env.DEV && import.meta.hot) {
  // If we want to support HMR for new files, we might need a different approach,
  // but simpler is to just accept updates.
  // import.meta.glob with eager: true invalidates when files change?
  // Actually, for HMR on *added* files, glob needs to be re-evaluated.
  // But standard HMR works on modified files.
  // We'll keep it simple for now as this is mainly to fix the BUILD.
}

export { api, API_BASENAME };
