import { Elysia } from 'elysia'
import routes from './routes'
import cors from '@elysiajs/cors'

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:5173', 'http://0.0.0.0:5173'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposeHeaders: '*',
      credentials: true,
      maxAge: 600,
      preflight: true,
    }),
  )
  .options('/*', ({ set }) => {
    // Responder ao preflight OPTIONS
    set.status = 204
    return ''
  })
  .use(routes)
  .listen(3000)

  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)