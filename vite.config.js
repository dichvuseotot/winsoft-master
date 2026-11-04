import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    reactRouter(),
    {
      name: 'chrome-devtools-well-known',
      configureServer(server) {
        server.middlewares.use('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.end('{}')
        })
      },
    },
  ],
  server: {
    port: 3001,
  },
})
