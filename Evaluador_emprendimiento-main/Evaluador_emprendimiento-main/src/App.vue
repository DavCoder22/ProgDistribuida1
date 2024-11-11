<template>
  <div id="app" class="app-container">
    <h1>Análisis de Viabilidad de Negocios</h1>
    <div class="content-container">
      <div class="input-section" :class="{ 'collapsed': isCollapsed }">
        <InputForm @form-submit="handleFormSubmit" @clear-result="clearResult" @toggle-collapse="handleCollapse" />
      </div>
      <div class="results-section" :class="{ 'expanded': isCollapsed }">
        <ResultsDisplay :loading="loading" :result="result" />
      </div>
    </div>
  </div>
</template>

<script>
import InputForm from './components/InputForm.vue';
import ResultsDisplay from './components/ResultsDisplay.vue';
import LangflowClient from './langflow/LangflowClient.js';

export default {
  name: 'App',
  components: {
    InputForm,
    ResultsDisplay,
  },
  data() {
    return {
      result: null,
      loading: false,
      isCollapsed: false, // Estado colapsado
    };
  },
  methods: {
    async handleFormSubmit(inputData) {
      this.loading = true;
      this.result = null;
      const langflowClient = new LangflowClient('http://127.0.0.1:7860', 'sk-pnbfwRh_6mRcetGgQd1MuMyT7CtFDR0ssjByMNGs7Iw');
      try {
        const response = await langflowClient.initiateSession(inputData.descripcion_completa);
        this.result = {
          isHtml: false,
          outputs: response.outputs,
        };
      } catch (error) {
        console.error('Error al ejecutar el flujo:', error);
        this.result = {
          isHtml: true,
          html: 'Ocurrió un error al procesar la solicitud. Por favor, intenta de nuevo más tarde.',
        };
      } finally {
        this.loading = false;
      }
    },
    clearResult() {
      this.result = null;
      this.loading = false;
    },
    handleCollapse(isCollapsed) {
      this.isCollapsed = isCollapsed;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Telidon:wght@400;700&display=swap');

body {
  font-family: 'Telidon', Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

.app-container {
  max-width: 1500px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-height: 1000px; 
}

h1 {
  font-family: 'Telidon', serif;
  font-size: 32px;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

.content-container {
  display: flex;
  gap: 20px;
}

.input-section {
  flex: 1;
  max-width: 450px; 
  transition: max-width 0.3s ease;
}

.input-section.collapsed {
  max-width: 50px; /* Ajusta según el tamaño del botón de usuario */
}

.results-section {
  flex: 3;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 900px;
  transition: flex 0.3s ease;
}

.results-section.expanded {
  flex: 30;
}
</style>
