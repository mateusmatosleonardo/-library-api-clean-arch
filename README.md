# biblioteca

Esta é uma aplicação de **gestão de livros de uma biblioteca**.

## Requisitos

### Requisitos funcionais

- [ ] o administrador deve poder cadastrar um novo usuário;
- [ ] o administrador deve poder visualizar todos os usuários;
- [ ] o administrador deve poder buscar um usuário específico pelo e-email;
- [x] o administrador deve poder cadastrar um livro da biblioteca;
- [x] o administrador deve poder visualizar um livro pelo nome ou ISBN;
- [ ] o administrador deve poder visualizar a lista de registro de empréstimos;

### Regras de negócio

- [ ] CPF e email do usuário devem ser únicos;
- [ ] ISBN do livro deve ser único;
- [ ] a data de retorno não pode ser menor que a data de saída;
- [ ] um usuário não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo;
- [ ] um usuário pode estar com mais de um livro com ISBN diferentes ao mesmo tempo;
- [ ] ao cadastrar um empréstimo, será enviado um e-mail automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno;
- [ ] caso o usuário tenha atrasado, será gerado uma multa fixa de 10,00;
- [ ] exibir todos os empréstimos pendentes, com nome do livro, nome do usuário, CPF, data de saída e data de retorno, ordenados pela data de retorno mais antiga
