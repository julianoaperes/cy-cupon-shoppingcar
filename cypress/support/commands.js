// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// *** IMPORTA A FUNCIONALIDADE DO PACOT CYPRESS-XPATH ***
require("cypress-xpath");
//Importa a funcionalidade do pacote cypress-xpath e  permite utilizar seletores XPath

// *** CUSTOM COMMAND PARA USO NOS LOGINS ***
Cypress.Commands.add("login", (email, senha) => {
  cy.visit("/"); //Acessa o link de login inserido no arquivo "cypress.config.js"
  // Encontra o campo "e-mail" e digita o e-mail
  cy.xpath('(//input[@id="id_email"])[1]')
    .should("be.visible")
    .type("juliano.a.peres@gmail.com");
  //Encontra o campo "senha" e digita a senha
  cy.xpath('(//input[@id="id_senha"])[1]').should("be.visible").type("123456");
  //Encontra o botão "Prosseguir" e clica
  cy.xpath('(//button[normalize-space()="Prosseguir"])[1]')
    .should("be.visible")
    .click();
  //Acessa o catálogo de produtos encontrando e clicando no botão "Categoria nível 1"
  cy.xpath('(//strong[normalize-space()="Categoria Nível 1"])[1]')
    .should("be.visible")
    .click();
});
//********************************************
