import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { TDesignResolver } from "unplugin-vue-components/resolvers"
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
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
