import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { GET as horizons } from './api/horizons.ts'
import { GET as marsWeather } from './api/mars-weather.ts'
import { GET as commsDelay } from './api/comms-delay.ts'

export default defineConfig({
  base: './',
  plugins: [react(), {
    name: 'local-horizons-api',
    configureServer(server) {
      for (const [path, handler] of [['/api/mars-weather', marsWeather], ['/api/comms-delay', commsDelay]] as const) {
        server.middlewares.use(path, async (_req, res) => {
          const response = await handler()
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(await response.text())
        })
      }
      server.middlewares.use('/api/horizons', async (_req, res) => {
        const response = await horizons()
        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        res.end(await response.text())
      })
    },
  }],
  server: {
    proxy: {
      '/api/nasa-images': {
        target: 'https://images-api.nasa.gov',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/nasa-images/, '/search'),
      },
    },
  },
})
