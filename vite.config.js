import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../mistertoy-backend/public',
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/setup/vars.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})




// import path from 'path'

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//         outDir: '../mistertoy-backend/public',
//         emptyOutDir: true,
//     },
//     css: {
//       preprocessorOptions: {
//         scss: {
//           additionalData: `@import "${path.resolve(__dirname, 'src/assets/style/setup/vars.scss')}";`
//         }
//       }
//     }

// })
