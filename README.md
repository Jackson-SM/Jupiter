## Visão Geral
> Este documento fornece uma visão geral e uma documentação básica para um projeto de gerenciador de tarefas desenvolvido em HTML, CSS e JavaScript. O projeto utiliza uma API fornecida por outro repositório para realizar operações de login, registro e gerenciamento de tarefas.

- <a href="https://jupiter-project.netlify.app/">Deploy da Aplicação</a>

## Funcionalidades Principais
O gerenciador de tarefas possui as seguintes funcionalidades principais:

### Autenticação de Usuário:

- Login: Os usuários podem fazer login fornecendo um nome de usuário e senha válidos.
- Registro: Os usuários podem se registrar fornecendo um nome de usuário, senha e informações adicionais, se necessário.
Gerenciamento de Tarefas:

- Adicionar Tarefa: Os usuários podem adicionar novas tarefas especificando um título, descrição e data de vencimento.
- Listar Tarefas: As tarefas são exibidas em uma lista, incluindo informações como título, descrição e status (concluída ou pendente).
- Atualizar Tarefa: Os usuários podem marcar uma tarefa como concluída ou alterar as informações (título, descrição, data de vencimento) de uma tarefa existente.
- Excluir Tarefa: Os usuários podem excluir uma tarefa existente da lista.

## Arquitetura
O projeto segue uma arquitetura cliente-servidor, onde o cliente é implementado em HTML, CSS e JavaScript, enquanto o servidor é fornecido pela API desenvolvida em outro repositório.

Tecnologias Utilizadas
- HTML: Linguagem de marcação utilizada para estruturar e exibir o conteúdo do aplicativo.
- CSS: Linguagem de estilo utilizada para definir a aparência e o layout do aplicativo.
- JavaScript: Linguagem de programação utilizada para implementar a lógica e interatividade do aplicativo.
- API: Uma API externa desenvolvida em outro repositório é utilizada para realizar operações de autenticação e gerenciamento de tarefas.

## Estrutura do Projeto
O projeto segue uma estrutura básica de arquivos e diretórios:
- public - Onde ficará arquivos publicos como Images, Arquivos CSS e afins.
- project - Pasta destinada para cuidar de projetos que precisam de uma lógica maior de CSS e Javascript.
- index.html - Arquivo de página inicial da aplicação.

## Uso da Aplicação
Para utilizar o aplicativo de gerenciamento de tarefas, siga as etapas abaixo:

- Faça o clone do repositório para obter os arquivos do projeto.
- Abra o arquivo index.html em um navegador da web compatível.
- Na página inicial, você será apresentado com as opções de login.

### Selecione a opção desejada:
- Para fazer login, digite seu nome de usuário e senha registrados e clique no botão "Fazer Login".
- Para registrar uma nova conta, clique na opção "Não possuo uma conta" e em seguida preencha o formulário de registro com seu nome de usuário, senha e outras informações necessárias. Em seguida, clique no botão "Registrar".
- Após fazer login ou registrar uma nova conta, você será redirecionado para a página principal do aplicativo de gerenciamento de tarefas.
- Na página principal, você poderá adicionar novos workspaces, projetos e tarefas.
