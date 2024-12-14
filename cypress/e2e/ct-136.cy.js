describe("[CT 136] Validaçao no caso da inserção de um cupom inexistente. Link: https://dev.azure.com/jp-lojaintegrada/Loja%20Integrada/_testManagement/runs?_a=resultSummary&runId=7&resultId=100000", () => {
  // ***** Ganchos executados antes de cada teste ***
  beforeEach(() => {
    cy.login("email", "senha"); // Faz o login já com email e senha
  });
  // *******************************************************
  it("Deve exibir a mensagem de cupom inexistente", () => {
    cy.get(".listagem-item.prod-id-118475039") // Encontra no catálogo, o produto pela classe
      .trigger("mouseover") // Passa o cursor do mouse sobre o produto com a intenção de mostrar elentos invisiveis
      // Encontra a div com o icone do carrinho sgv-ico
      .find(".acoes-produto")
      .should("exist")
      //Encontra o icone do carrinho sgv e clica
      .find("#Componente_22_3")
      .click();
  });
});
