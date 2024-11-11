import { createRouter, createWebHistory } from 'vue-router';
import InputForm from './components/InputForm.vue';
import ResultsDisplay from './components/ResultsDisplay.vue';
import NotFound from './components/NotFound.vue'; // Asegúrate de que el archivo NotFound.vue exista

const routes = [
  { path: '/', component: InputForm },
  { path: '/results', component: ResultsDisplay },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // Ruta de captura
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
