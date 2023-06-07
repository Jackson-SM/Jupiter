### Objetivo da aplicação:
> A aplicação de gerenciamento de tarefas tem como objetivo auxiliar os usuários na organização e acompanhamento de suas tarefas diárias. Através dela, os usuários podem criar, editar e marcar tarefas como concluídas, garantindo um maior controle e produtividade em suas atividades.

### Links
- <a href="https://drive.google.com/uc?export=download&id=1r_oshwxFZr83nQynI19Rx0Rkd3nUl0Im">Diagrama Jupiter PDF</a>
- <a href="https://drive.google.com/uc?export=download&id=1alsMc4TWsnxbt788MExrlKbuZbRHckN5">Diagrama Jupiter PNG</a>
- <a href="https://jupiter-project.netlify.app/">Deploy da Aplicação</a>

### Padrões Utilizados: DDD e SOLID:
> A aplicação foi desenvolvida utilizando os padrões de arquitetura de software DDD (Domain-Driven Design) e SOLID (Princípios de Responsabilidade Única, Aberto/Fechado, Substituição de Liskov, Segregação de Interfaces e Inversão de Dependência). Esses padrões visam a modularização do código, facilitando a manutenção, a escalabilidade e a testabilidade da aplicação.

### Estrutura de pastas:
#### A estrutura de pastas da aplicação é organizada de forma a seguir os princípios do DDD, separando as responsabilidades em diferentes camadas. As principais pastas são:

- Application: Nesta pasta estão os arquivos relacionados à camada de aplicação da aplicação, onde são definidos os controladores, as rotas e as regras de negócio específicas da interface de usuário.

- Domain: A pasta Domain contém as entidades e as regras de negócio principais da aplicação. Aqui são definidos os modelos de dados, os serviços de domínio e os eventos que ocorrem no sistema.

- Helpers: Nesta pasta estão localizados os arquivos de auxílio, como funções utilitárias e bibliotecas de terceiros necessárias para o funcionamento da aplicação.

- Infra: A pasta Infra abriga os arquivos relacionados à camada de infraestrutura da aplicação, como o acesso a banco de dados, serviços externos e outras dependências técnicas.


### Utilizar o projeto:

- Instalar as dependências
```zsh
yarn
```
- Iniciar a aplicação.
```zsh
yarn dev
```

- Criar um build da aplicação
```zsh
yarn build
```
- Iniciar o build da aplicação.
```zsh
yarn start
```


### Tecnologias utilizadas:

- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript, melhorando a qualidade e a robustez do código.
- **Hapi.js**: Framework Node.js para construção de aplicativos web e APIs, conhecido por sua facilidade de uso, flexibilidade e recursos poderosos de roteamento.
- **Jest**: Framework de teste em JavaScript e TypeScript, utilizado para testes unitários, integração e snapshots.
- **ESLint**: Ferramenta de linting que identifica e corrige problemas no código JavaScript e TypeScript, garantindo consistência e qualidade.
- **Prettier**: Ferramenta de formatação de código que mantém um estilo consistente em todo o projeto, melhorando a legibilidade.
- **Prisma ORM**: Biblioteca de mapeamento objeto-relacional que simplifica a interação com o banco de dados.
- **MongoDB**: Utilizei como banco de dados NoSQL para uma maior performance e velocidade da aplicação MongoDB.
- **Motivo da escolha do Hapi.js**:
O Hapi.js foi escolhido devido à sua documentação completa, comunidade ativa e facilidade de aprendizado. Ele oferece recursos poderosos de roteamento e manipulação de solicitações, sendo adequado para a construção de APIs. Sua arquitetura modular, que segue os princípios do DDD, permite uma separação clara de responsabilidades e facilita a organização e testabilidade do código.

### Conclusão:
#### A aplicação de gerenciamento de tarefas desenvolvida em Hapi.js utiliza os padrões DDD e SOLID para proporcionar uma arquitetura modular e de fácil manutenção. Com uma estrutura de pastas bem definida, a aplicação separa as responsabilidades de cada camada, facilitando a compreensão do código e o desenvolvimento de novas funcionalidades.
