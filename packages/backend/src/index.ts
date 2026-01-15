import { Elysia } from 'elysia'
import routes from './routes'
import cors from '@elysiajs/cors'

// Configurar origens permitidas baseado no ambiente
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://0.0.0.0:5173']
  : true // Em produção sem FRONTEND_URL, aceita qualquer origem

const app = new Elysia()
  .use(
    cors({
      origin: allowedOrigins,
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
  .listen(process.env.PORT || 3000)

  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)