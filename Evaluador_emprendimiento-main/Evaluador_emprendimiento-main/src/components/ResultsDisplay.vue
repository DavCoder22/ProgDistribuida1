<template>
  <div class="results-container">
    <h2>Resultados de la Evaluación</h2>
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Cargando...</p>
    </div>
    <div v-else class="result-content">
      <div class="ia-icon">
        <img src="../assets/ia-icon.png" alt="IA Icon" />
      </div>
      <!-- Render Markdown content as HTML -->
      <div v-html="formattedResponse" class="markdown-result"></div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { marked } from 'marked';

export default {
  props: {
    result: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const formattedResponse = ref('');

    const processResult = (result) => {
      if (result && result.outputs) {
        try {
          const responseText = result.outputs[0].outputs[0].results.message.text;
          // Convertir el texto de Markdown a HTML
          formattedResponse.value = marked(responseText);
        } catch (e) {
          console.error('Error processing result:', e);
          formattedResponse.value = 'Hubo un error al procesar la respuesta.';
        }
      }
    };

    watch(
      () => props.result,
      (newVal) => {
        if (newVal) {
          processResult(newVal);
        }
      },
      { immediate: true }
    );

    return {
      formattedResponse
    };
  }
};
</script>

<style scoped>
.results-container {
  margin-top: 20px;
  font-family: 'Telidon', Arial, sans-serif;
}

.loading-spinner {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.spinner {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.result-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-top: 20px;
}

.ia-icon img {
  width: 40px;
  height: 40px;
}

.markdown-result {
  flex-grow: 1;
  text-align: left;
  max-height: 400px;
  overflow-y: auto;
  padding: 120px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Telidon', Arial, sans-serif;
  font-size: 16px; 
  line-height: 1.6; 
  color: #333; 
}

.markdown-result h1,
.markdown-result h2,
.markdown-result h3 {
  font-family: 'Telidon', Arial, sans-serif;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.markdown-result p {
  margin-bottom: 15px;
}

.markdown-result table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.markdown-result th,
.markdown-result td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.markdown-result th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.markdown-result ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.markdown-result li {
  margin-bottom: 5px;
}

.markdown-result::-webkit-scrollbar {
  width: 10px;
}

.markdown-result::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

.markdown-result::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
