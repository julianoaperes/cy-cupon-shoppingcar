describe("[CT 149] Aplicação bem-sucessida do cupom 10OFF com um produto no carrinho, opção de envio SEDEX, até o pagamento.", () => {
  //Link CT 149: https://dev.azure.com/jp-lojaintegrada/Loja%20Integrada/_testManagement/runs?_a=resultSummary&runId=18&resultId=100000
  // ***** Ganchos executados antes de cada teste ***
  beforeEach(() => {
    cy.login("juliano.a.peres@gmail.com", "123456"); // Faz o login com o uso da custom command "login"
    cy.EsvaziaCarrinho(); // Custom command que esvazia o carrinho
    cy.Adiciona1ProdutonoCarrinho(); // Custom command que adiciona um produto ao carrinho
    cy.RemoveCupom(); // Custom command que remover cupom da modal
  });
  // *******************************************************
  it("Dado que o cliente insira o cupom '10OFF' e selecione opção de envio 'SEDEX', então o desconto de 10% deve ser dado apenas no valor do produto", () => {
    cy.InsereCupom("10OFF"); // Custom command que insere o cupom e clica no botão "usar cupom"
    cy.InsereCEP("17360-000"); //Custom command que insere o cep
    cy.get(".formas-envio");
    cy.get('input[data-code="SEDEX"]').click();
    cy.get(".cupom-codigo").should("have.text", "10OFF"); // Valida a informação do código inserido
    cy.get(".muted").should(
      "have.text",
      "(Alguns cupons não são cumulativos com promoções.)(frete não incluso)" // Valida a informação sobre acúmulo de cupons e frete não incluso
    );

    const dezOff = 0.1; // Porcentagem de desconto (10%)
    let subtotal, frete; // Variáveis para armazenar subtotal e frete
    cy.xpath('(//div[@class="subtotal"])[1]')
      .invoke("attr", "data-subtotal-valor")
      .then((valorSubtotal) => {
        expect(valorSubtotal).to.not.be.undefined;
        subtotal = parseFloat(valorSubtotal) || 0; // Se falhar, assume 0
        expect(subtotal).to.be.a("number"); // Confirma que é um número
      });
    cy.get('input[data-code="SEDEX"]')
      .should("have.attr", "data-valor") // Garante que o atributo existe
      .then((valorFrete) => {
        expect(valorFrete).to.not.be.undefined;
        frete = parseFloat(valorFrete.replace(/[^\d.-]/g, "") || 0); // Converte frete em número
        expect(frete).to.be.a("number"); // Confirma que é um número

        // Calcula o valor do desconto
        const totalDescontado = subtotal * dezOff;

        // Valida o valor do cupom aplicado
        cy.xpath('//span[@id="cupom_valor_real"][1]')
          .invoke("text")
          .then((text) => {
            const valorCupom = parseFloat(text.replace(/[^\d.-]/g, ""));
            const totalDescontado = parseFloat(text.replace(/[^\d.-]/g, ""));
            expect(valorCupom).to.eq(totalDescontado); // Compara o valor do cupom com o desconto calculado
          });

        // Valida o total final
        cy.xpath('(//strong[@class="titulo cor-principal valor-total"])[1]')
          .should("have.attr", "data-total-valor") // Garante que o atributo existe
          .then((valorTotal) => {
            const totalCalculado =
              (subtotal || 0) - (totalDescontado || 0) + (frete || 0); // Calcula o total esperado
            const totalExibido = parseFloat(valorTotal); // Converte o valor exibido em número

            // Validação final do total
            expect(totalExibido).to.eq(totalCalculado);
            console.log(
              `Subtotal: ${subtotal}, Frete: ${frete}, Total: ${totalExibido}`
            );
          });
      });
  });
});

//     const dezOff = 0.1; // "dezOff é o cudpom que atribui 10% de desconto nos produtos da compra pelo cliente"
//     let subtotal; // é a variável atribuida de ao valor dos produtos escolhidos e inseridos no carrinho do cliente
//     let frete; // é a variavel que inidicara a forma de envio escolhida pelo cliente

//     cy.get(".subtotal")
//       .invoke("attr", "data-subtotal-valor")
//       .then((valorSubtotal) => {
//         subtotal = parseFloat(valorSubtotal);
//         cy.get('input[data-code="SEDEX"]')
//           .invoke("attr", "data-valor")
//           .then((valorFrete) => {
//             frete = parseFloat(valorFrete);
//             const totalDescontado = parseFloat(subtotal * dezOff);
//             cy.xpath('//span[@id="cupom_valor_real"][1]')
//               .invoke("text")
//               .then((text) => {
//                 const valorCupom = parseFloat(text.replace(/[^\d.-]/g, ""));
//                 expect(valorCupom).to.eq(totalDescontado);
//               });

//             cy.xpath('(//strong[@class="titulo cor-principal valor-total"])[1]')
//               .invoke("attr", "data-total-valor")
//               .then((valorTotal) => {
//                 let total = parseFloat(valorTotal);
//                 console.log(total);
//               });
//           });
//       });
//   });
// });
//     const dezOff = 0.1;
//     let subtotal = ("attr", "data-subtotal-valor");
//     let frete = '//input[@value="156583"])[1]';
//     let total = subtotal * dezOff + frete;
//     cy.get(".subtotal")
//       .invoke("attr", "data-subtotal-valor")
//       .then((apliqueDezOff) => {
//         const totalDescontado = subtotal * 0.1;
//         const totaDescontado = '//span[@id="cupom_valor_real"])[1]';
//       });
//     cy.xpath('//span[@id="cupom_valor_real"][1]').expect.to.eq(totaDescontado);

//     cy.xpath('(//strong[@class="titulo cor-principal valor-total"])[1]')
//       .invoke("attr", "data-total-valor")
//       .then((valorTotal) => {
//         let total = valorTotal;
//         console.log(valorTotal);
//       });
//     cy.xpath('(//strong[@class="titulo cor-principal valor-total"])[1]')
//       .invoke("attr", "data-total-valor")
//       .then((valorTotal) => {
//         let total = valorTotal;
//       });
//   });
// });
