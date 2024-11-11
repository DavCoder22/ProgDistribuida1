<template>
  <div class="form-wrapper" :class="{ 'collapsed': isCollapsed }">
    <form v-if="!isCollapsed" @submit.prevent="submitForm" class="form-container">
      <div class="form-group">
        <div class="user-icon" @click="toggleCollapse">
          <img src="../assets/user-logo.svg" alt="User Logo" class="icon-image" />
        </div>
        <div class="input-container">
          <label for="descripcion_completa" class="input-label">Tu Mensaje:</label>
          <textarea 
            id="descripcion_completa" 
            v-model="descripcion_completa" 
            @input="validateDescription" 
            maxlength="500" 
            required
            placeholder="Describe tu negocio, el monto de inversión, y tu objetivo o pregunta específica."
            class="input-textarea"
          ></textarea>
        </div>
        <button type="submit" class="submit-button">
          <img src="../assets/send-icon.png" alt="Enviar" class="send-icon" />
        </button>
      </div>
      <small v-if="descripcionError" class="error-message">{{ descripcionError }}</small>
    </form>
    <div v-else class="collapsed-icon" @click="toggleCollapse">
      <img src="../assets/user-logo.svg" alt="User Logo" class="icon-image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      descripcion_completa: '',
      descripcionError: '',
      isCollapsed: false,
      tipoAnalisis: ', dame con análisis de factibilidad con indicadores financieros.' // Valor por defecto para el análisis
    };
  },
  methods: {
    validateDescription() {
      const regex = /^[A-Za-z0-9\sñÑáéíóúÁÉÍÓÚ.$,%?!¿()]*$/;
      if (!regex.test(this.descripcion_completa)) {
        this.descripcionError = 'El mensaje solo debe contener letras, números, espacios, y los signos permitidos.';
      } else {
        this.descripcionError = '';
      }
    },
    submitForm() {
      this.validateDescription();
      
      if (!this.descripcionError) {
        this.$emit('start-loading');
        this.$emit('clear-result');
        this.$emit('form-submit', {
          descripcion_completa: this.descripcion_completa,
          tipoAnalisis: this.tipoAnalisis // Incluye el tipo de análisis en el envío del formulario
        });
      }
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('toggle-collapse', this.isCollapsed); 
    }
  }
};
</script>


<style scoped>
.form-wrapper {
  display: flex;
  justify-content: flex-start; 
  padding: 20px;
  transition: max-width 0.3s ease;
}

.form-wrapper.collapsed {
  max-width: 50px;
  cursor: pointer;
}

.form-container {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.user-icon, .collapsed-icon {
  flex-shrink: 0;
}

.icon-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.input-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.input-label {
  font-family: 'Telidon', Arial, sans-serif;
  font-weight: bold;
  color: #1e7145; 
  font-size: 16px; 
  margin-bottom: 5px;
}

.input-textarea {
  width: 100%; 
  padding: 10px;
  font-size: 14px;
  border-radius: 5px; 
  border: 1px solid #ccc;
  min-height: 80px; 
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

.input-textarea:focus {
  border-color: #1084b9;
  box-shadow: 0 0 8px rgba(38, 119, 151, 0.4);
  outline: none;
}

.submit-button {
  padding: 10px;
  border: none;
  background-color: #78b830;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px; /* Espacio arriba del botón */
  height: 40px;
  width: 40px;
}

.submit-button:hover {
  background-color: #87d32f;
  transform: scale(1.1);
}

.send-icon {
  width: 20px;
  height: 20px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

/* Diseño responsivo */
@media (max-width: 768px) {
  .form-container {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .form-group {
    flex-direction: column;
    gap: 10px;
  }

  .user-icon {
    margin-bottom: 10px;
  }

  .submit-button {
    align-self: center;
    margin-top: 15px;
  }
}
</style>
