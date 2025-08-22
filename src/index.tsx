import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { swaggerUI as honoSwaggerUI } from '@hono/swagger-ui';
import { authRoute } from './routes/auth';
import { rootRoute } from './routes/root';
import { configDocs, configGeneral } from './configs/app';

const app = new OpenAPIHono();

// Configure Middlewares
app.use('*', logger()).use('*', cors());

const apiRoutes = app
  .basePath('/')
  .route('/', rootRoute)
  .route('/auth', authRoute);

apiRoutes
  .doc(configDocs.openapi, {
    openapi: '3.1.0',
    info: { ...configGeneral, version: 'v1' },
  })
  .get(configDocs.swagger, honoSwaggerUI({ url: '/openapi.json' }))
  .get('/welcome', (c) => c.text('Welcome to HiKa API!'))
  .onError((err, c) => {
    return c.json({ code: 500, status: 'error', message: err.message }, 500);
  });

console.info(`🌸 HiKa Backend API 💽 DATABASE_URL: `);

export default app;

export type ApiRoutes = typeof apiRoutes;
