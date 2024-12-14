describe("[CT 136] Validaçao no caso da inserção de um cupom inexistente.", () => {
  //Link CT 136: https://dev.azure.com/jp-lojaintegrada/Loja%20Integrada/_testManagement/runs?_a=resultSummary&runId=7&resultId=100000
  // ***** Ganchos executados antes de cada teste ***
  beforeEach(() => {
    cy.login("email", "senha"); // Faz o login já com email e senha
  });
  // *******************************************************
  it("Deve exibir a mensagem de cupom não encontrado", () => {
    cy.get(".listagem-item.prod-id-118475039") // Encontra no catálogo, o produto pela classe
      .trigger("mouseover") // Passa o cursor do mouse sobre o produto com a intenção de mostrar elentos invisiveis
      // Encontra a div com o icone do carrinho sgv-ico
      .find(".acoes-produto")
      .should("exist")
      //Encontra o icone do carrinho sgv e clica
      .find("#Componente_22_3")
      .click();
    cy.xpath('(//div[@class="fancybox-skin"])[1]').should("be.visible"); //Econtra a modal
    cy.xpath('(//input[@id="usarCupom"])[1]').type("TESTE"); //Encontra o campo para inserir o cupom e digita
    cy.xpath('(//button[normalize-space()="Usar cupom"])[1]').click(); //Encontra e clica no botão "Usar cupom"
    //Encontra a caixa da mensagem e valida o texto.
    cy.xpath('(//div[@class="alert alert-danger alert-geral"])[1]').should(
      "contain.text",
      "Cupom não encontrado."
    );
  });
});
