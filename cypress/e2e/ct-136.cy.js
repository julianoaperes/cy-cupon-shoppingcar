describe("[CT 136] Validaçao no caso da inserção de um cupom inexistente.", () => {
  //Link CT 136: https://dev.azure.com/jp-lojaintegrada/Loja%20Integrada/_testManagement/runs?_a=resultSummary&runId=7&resultId=100000
  // ***** Ganchos executados antes de cada teste ***
  beforeEach(() => {
    cy.login("juliano.a.peres@gmail.com", "123456"); // Faz o login com o uso da custom command "login"
    cy.EsvaziaCarrinho(); // Garaten que o carrinho esteja vazio
    cy.Adiciona1ProdutonoCarrinho(); //Adiciona um produto ao carrinho com a custom command
    cy.RemoveCupom(); //Caso exita algum cupom inserido no campo, será removido.
  });
  // *******************************************************
  it("Dado que o cliente insira um cupom inexistente, então deverá receber o feedback 'Cupom não encontrado'.", () => {
    cy.InsereCupom("TESTE"); //Insere e valida o cupom através da custom command
  });
});
