import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { TDesignResolver } from "unplugin-vue-components/resolvers"
import path from "node:path"
import svgLoader from "vite-svg-loader"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: "component"
    }),
    AutoImport({
      resolvers: [TDesignResolver({
        library: "mobile-vue"
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: "mobile-vue"
      })],
    }),
  ],
})
