import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:3009', // Redirige todas las solicitudes que comiencen con "/auth" a tu servidor Express
      '/update': 'http://localhost:3009', // Redirige todas las solicitudes que comiencen con "/update"
      // Agrega más rutas de tu API si es necesario
    },
  },
});
