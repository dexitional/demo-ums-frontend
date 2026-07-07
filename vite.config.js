import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  define: {
    // "process.env": process.env,
    // // By default, Vite doesn't include shims for NodeJS/
    // // necessary for segment analytics lib to work
   // "global": {}, // Comment Out during Build
  },
  
})
