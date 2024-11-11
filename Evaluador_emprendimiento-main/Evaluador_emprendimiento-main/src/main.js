import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que la ruta es correcta

// Crea la aplicación y usa el router
createApp(App)
  .use(router)
  .mount('#app');
