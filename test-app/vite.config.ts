import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component-test';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgrComponent(),
    react(),
  ]
})
