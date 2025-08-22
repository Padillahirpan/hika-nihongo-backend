import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Hono } from 'hono';

export const rootRoute = new OpenAPIHono();

rootRoute.openapi(
  createRoute({
    method: 'get',
    path: '/hello',
    request: {
      query: z.object({ name: z.string().optional() }),
    },
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': { schema: z.object({ message: z.string() }) },
        },
      },
    },
  }),
  (c) => {
    const { name } = c.req.valid('query');
    if (!name) return c.json({ message: `Hello!` });
    return c.json({ message: `Hello, ${name}!` });
  },
);
