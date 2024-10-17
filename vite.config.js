import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', 
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',  
        dashboard: 'src/pages/dashboard.html', 
        login: 'src/pages/login.html',
        register: 'src/pages/register.html'
      }
    }
  }
});
