import { type Elysia } from 'elysia'
import { pixAbacate } from './core';

export default function routes(app: Elysia) {
    return app
        .post('/pix', async ({ body }) => {
            try {
            const { value, name } = body as { value: number; name: string }
            const data = await pixAbacate(value, name)
            return { success: true, data }
            } catch (error) {
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Erro desconhecido' 
            }
            }
        })
}
