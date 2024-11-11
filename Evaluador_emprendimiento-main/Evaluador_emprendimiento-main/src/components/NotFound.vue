<template>
    <div class="not-found-container">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    font-family: 'Open Sans', Arial, sans-serif;
  }
  
  h1 {
    font-size: 36px;
    color: #ff0000;
  }
  
  p {
    font-size: 18px;
  }
  </style>
  