import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createReadStream, existsSync } from 'node:fs'
import { dirname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))

/**
 * Serves the PDF catalogue and product sheets under `npm run dev`.
 *
 * In production they are generated into dist/downloads by the build
 * (scripts/prerender.mjs). The dev server has no such files, so without this
 * a download would save the site's HTML under a .pdf name — a "blank PDF".
 * They are generated on the first request into node_modules/.cache and kept
 * for the rest of the session; restart `npm run dev` to regenerate.
 */
function devDownloads() {
  const cacheDir = join(root, 'node_modules/.cache/navora-downloads')
  let generating = null

  return {
    name: 'navora-dev-downloads',
    apply: 'serve',
    configureServer(server) {
      const generate = async () => {
        const { getProducts } = await server.ssrLoadModule('/src/lib/sanity.js')
        const { site } = await server.ssrLoadModule('/src/config/site.js')
        const productsCopy = await server.ssrLoadModule('/src/content/products.js')
        const { atAGlance } = await server.ssrLoadModule('/src/content/home.js')
        const { buildCatalogue } = await import('./scripts/catalogue.mjs')
        const products = await getProducts()
        await buildCatalogue({ root, dist: cacheDir, products, site, productsCopy, atAGlance })
      }

      server.middlewares.use(async (req, res, next) => {
        const path = decodeURIComponent((req.url || '').split('?')[0])
        if (!path.startsWith('/downloads/')) return next()

        try {
          generating ??= generate()
          await generating
        } catch (error) {
          generating = null
          server.config.logger.error(`PDF generation failed: ${error.message}`)
          res.statusCode = 500
          return res.end('PDF generation failed — see the dev server log.')
        }

        const file = resolve(cacheDir, normalize(path).replace(/^[/\\]+/, ''))
        if (!file.startsWith(cacheDir) || !existsSync(file)) {
          res.statusCode = 404
          return res.end('Not found')
        }
        res.setHeader('Content-Type', 'application/pdf')
        createReadStream(file).pipe(res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devDownloads()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-icons")) return "vendor-icons";
            if (id.includes("@sanity")) return "vendor-sanity";
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("react-helmet")
            ) {
              return "vendor-react";
            }
          }
        },
      },
    },
  },
})
