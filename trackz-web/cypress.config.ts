// trackz-web/cypress.config.ts
import { defineConfig } from "cypress";
import axios from 'axios'; // 1. Importe o axios

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // 2. Registre a nova task aqui
      on('task', {
        async cleanupDatabase() {
          try {
            // Faz a chamada POST para o endpoint de limpeza do backend
            await axios.post('http://localhost:3002/test-utils/cleanup');
            return null; // Retorna null em caso de sucesso
          } catch (error) {
            console.error("Erro ao limpar o banco de dados:", error);
            throw error; // Lança o erro para que o Cypress saiba que a task falhou
          }
        },
      });
    },
  },
});