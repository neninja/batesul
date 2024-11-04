import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  //base: '/public/', // Ensure base path is set correctly
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    manifest: true,
    outDir: 'public/assets',
    rollupOptions: {
      input: {
        bootstrap: resolve(__dirname, 'resources/js/bootstrap'),
        //moduleLoader: resolve(__dirname, 'views/scripts/module-loader.ts'),
      },
      output: {
        entryFileNames: (chunk) => {
          return '[name].js';
        },
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name][extname]'
      },
    },
  },
});
