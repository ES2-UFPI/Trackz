/// <reference types="cypress" />

describe('Fluxo de Autenticação', () => {
  // O hook beforeEach roda antes de cada teste 'it()' dentro deste 'describe'
  beforeEach(() => {
    // Chama a task que configuramos no cypress.config.ts
    cy.task('cleanupDatabase');
  });

  it('deve permitir que um novo usuário se cadastre e faça login com sucesso', () => {
    // ... seu código de teste existente continua aqui ...
    const uniqueId = Date.now();
    const user = {
      nome: 'Usuário de Teste',
      email: `teste${uniqueId}@exemplo.com`,
      username: `testuser${uniqueId}`,
      senha: 'senha-de-teste-segura',
    };
    // --- Etapa de CADASTRO ---
    cy.visit('/cadastro');

    cy.get('#cadastro-nome').type(user.nome);
    cy.get('#cadastro-email').type(user.email);
    cy.get('#cadastro-usuario').type(user.username);
    cy.get('#cadastro-senha').type(user.senha);
    cy.get('#cadastro-confirmar-senha').type(user.senha);

    cy.get('form').submit();

    // --- Etapa de LOGIN ---
    cy.url().should('include', '/login');
    cy.contains('h1', 'Login').should('be.visible');

    cy.get('#usuario').type(user.username);
    cy.get('#senha').type(user.senha);

    cy.get('form').submit();

    // --- Verificação Final ---
    cy.url().should('include', '/dashboard');
    cy.contains('button', 'Logout').should('be.visible');
  });
});