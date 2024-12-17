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

// *** IMPORTA A FUNCIONALIDADE DO PACOTE CYPRESS-XPATH ***
require("cypress-xpath");
//Importa a funcionalidade do pacote cypress-xpath e  permite utilizar seletores XPath

// *** CUSTOM COMMAND QUE FAZ LOGIN ***
Cypress.Commands.add("login", (email, senha) => {
  cy.visit("/"); //Acessa o link de login inserido no arquivo "cypress.config.js"
  // Encontra o campo "e-mail" e digita o e-mail
  cy.xpath('(//input[@id="id_email"])[1]').should("be.visible").type(email);
  //Encontra o campo "senha" e digita a senha
  cy.xpath('(//input[@id="id_senha"])[1]').should("be.visible").type(senha);
  //Encontra o botão "Prosseguir" e clica
  cy.xpath('(//button[normalize-space()="Prosseguir"])[1]')
    .should("be.visible")
    .click();
});

// *** CUSTOM COMMAND QUE GARENTE QUE CARRINHO DE COMPRAS ESTEJA VAZIO ***
Cypress.Commands.add("EsvaziaCarrinho", () => {
  cy.get(".carrinho").click(); // Acessa o carrinho
  //Verifica se há produtos e deleta todos.
  cy.get("#corpo").then((corpo) => {
    if (corpo.find(".finalizar-compra").length > 0) {
      cy.get(".tabela-carrinho");
      cy.get(".icon-trash").each((iconTrash) => {
        cy.wrap(iconTrash).click();
        cy.wait(500);
        cy.xpath('(//a[normalize-space()="Ir às compras"])[1]').click();
      });
      // Caso o carrinho esteja vazio, retorna para página inicial.
    } else {
      cy.get(".caixa-destaque").should(
        "contain",
        "Não existem produtos no carrinho"
      );
      cy.xpath('(//a[normalize-space()="Ir às compras"])[1]').click();
    }
  });
});

// *** MODAL | CUSTOM COMMAND QUE ADICIONA 1 PRODUTO NO CARRINHO PELA MODAL ***
Cypress.Commands.add("Adiciona1ProdutonoCarrinho", () => {
  // Clica no botão "Categoria nível 1" e acessa o catálogo de produtos
  cy.xpath('(//strong[normalize-space()="Categoria Nível 1"])[1]')
    .should("be.visible")
    .click();
  cy.xpath('(//ul[contains(@class,"row-fluid")])[1]'); // Encontra os produtos pela lista
  // Passa o cursor do mouse sobre o produto com a intenção de mostrar elentos invisiveis
  cy.xpath('(//div[contains(@class,"prod-cat-15610605")])[1]')
    .trigger("mouseover")
    // Encontra a div com o icone do carrinho sgv-ico
    .find(".acoes-produto")
    .should("exist")
    //Encontra o icone do carrinho sgv e clica
    .find("#Componente_22_3")
    .click();
});
// *** MODAL | CUSTOM COMMAND QUE GARANTE QUE O CAMPO DO CUPOM ESTEJA VAZIO ***
Cypress.Commands.add("RemoveCupom", () => {
  cy.xpath('(//div[@class="fancybox-skin"])[1]').should("be.visible"); //Econtra a modal
  //Verifica se a modal está com cupom de desconto aplicado
  cy.xpath('(//div[@class="fancybox-skin"])[1]').then((fancyboxskin) => {
    if (fancyboxskin.find(".cupom-sucesso").length > 0)
      cy.get(".remover-cupom").click();
    else {
      cy.get("#usarCupom").should("be.visible");
    }
  });
});

// *** MODAL | CUSTOM COMMAND QUE APLICA CUPOM DE DESCONTO ***
Cypress.Commands.add("InsereCupom", (cupom) => {
  cy.xpath('(//div[@class="fancybox-skin"])[1]').should("be.visible"); //Econtra a modal
  cy.xpath('(//input[@id="usarCupom"])[1]').type(cupom); //Encontra o campo para inserir o cupom e digita
  cy.xpath('(//button[normalize-space()="Usar cupom"])[1]').click(); //Encontra e clica no botão "Usar cupom"
});

// *** CARRINHO DE COMPRAS | APAGA E INSERE CEP ***
Cypress.Commands.add("InsereCEP", (cep) => {
  cy.get("#formCalcularFrete").should("be.visible");
  cy.get("#calcularFrete").clear().type(cep);
});
