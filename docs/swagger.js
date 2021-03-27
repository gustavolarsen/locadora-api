const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Este é um projeto de uma API de locadora criada em NodeJS',
    version: '2.0',
    title: 'Swagger Locadora',
    contact: {
      email: 'guslarsen@gmaill.com',
    },
  },
  host: 'localhost:3001',
  tags: [
    {
      name: 'Customers',
      description: 'Endpoints para serviços de clientes',
    },
    {
      name: 'Movies',
      description: 'Endpoints para serviços de filmes',
    },
    {
      name: 'Login',
      description: 'Endpoint para autenticação de cliente',
    },
  ],
  paths: {
    '/customers': {
      post: {
        tags: ['Customers'],
        summary: 'Cadastra um novo cliente.',
        description:
          'Insere um novo clinte no banco de dados e retorna o  obejeto json com os dados inseridos.',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Objeto cliente',
            required: true,
            schema: {
              $ref: '#/definitions/Customers',
            },
          },
        ],
        responses: {
          200: {
            description: 'Cliente cadastrado com sucesso.',
            examples: {
              'application/json': {
                id: 0,
                name: 'string',
                email: 'string',
              },
            },
          },
          400: {
            description:
              'Requisitos para cadastro não atendindos ou cliente já cadastrado .',
          },
          500: {
            description: 'Erro inesperado no cadastro do cliente.',
          },
        },
      },
    },
    '/movies': {
      post: {
        tags: ['Movies'],
        summary: 'Cadastra um novo filme.',
        description:
          'Insere um novo filme no banco de dados e retorna o  obejeto json com os dados inseridos',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Objeto filmes',
            required: true,
            schema: {
              $ref: '#/definitions/Movies',
            },
          },
        ],
        responses: {
          200: {
            description: 'Filme cadastrado com sucesso.',
            examples: {
              'application/json': {
                id: 0,
                title: 'string',
                director: 'string',
                amount: 0,
              },
            },
          },
          400: {
            description: 'Erro no cadastro do filmes.',
          },
        },
      },
      get: {
        tags: ['Movies'],
        summary: 'Busca filmes cadastrados',
        description:
          'Retorna a listagem de todos filmes nos quais tenham a quantidade maior que zero. Também é possível buscar um filme pelo título passando o parâmetro com nome do filme pela URL',
        produces: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'title',
            type: 'string',
            description: 'GET /movies?title={titulo-do-filme}',
          },
        ],
        responses: {
          200: {
            description: 'Filme cadastrado com sucesso.',
            examples: {
              'application/json': [
                {
                  id: 0,
                  title: 'string',
                  director: 'string',
                  amount: 0,
                },
                {
                  id: 1,
                  title: 'string',
                  director: 'string',
                  amount: 0,
                },
              ],
            },
          },
          404: {
            description: 'Filme não encontrado.',
          },
          500: {
            description: 'Erro inesperado ao consultar filmes disponíveis.',
          },
        },
      },
    },
    '/movies/rent/{idMovie}': {
      post: {
        tags: ['Movies'],
        summary: 'Gera um aluguel de um filme para um cliente.',
        description:
          'Realiza o aluguel de um filme para o cliente. O parâmentro cliente é passado através do token enviado pelo header.',
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'Bearer Authorization',
            type: 'string',
            required: true,
            description: 'Token de autorização gerado no login do cliente.',
          },
          {
            name: 'idMovie',
            in: 'path',
            description: 'Código do filme a ser alugado. ',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Filme cadastrado com sucesso.',
            examples: {
              'application/json': {
                idMovie: 0,
                idCustomer: 0,
                rentalDate: 'Date',
                expectedReturnDate: 'Date',
              },
            },
          },
          400: {
            description:
              'Cliente já possui este filme locado ou filme não está mais disponível.',
          },
          404: {
            description: 'Filme não encontrado.',
          },
          500: {
            description: 'Erro inesperado na locação do filme.',
          },
        },
      },
    },
    '/movies/return/{idMovie}': {
      put: {
        tags: ['Movies'],
        summary: 'Gera uma devolução de um filme para um cliente.',
        description:
          'Realiza a devolução de um filme que estava alugado ao cliente. O parâmentro cliente é passado através do token enviado pelo header.',
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'Bearer Authorization',
            type: 'string',
            required: true,
            description: 'Token de autorização gerado no login do cliente.',
          },
          {
            name: 'idMovie',
            in: 'path',
            description: 'Código do filme a ser devolvido.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Filme devolvido com sucesso.',
            examples: {
              'application/json': {
                message: 'Filme devolvido com sucesso.',
              },
            },
          },
          404: {
            description: 'Aluguel não encontrado.',
          },
          500: {
            description: 'Erro inesperado na devoluçao do do filme.',
          },
        },
      },
    },
    '/login': {
      post: {
        tags: ['Login'],
        summary: 'Autentica cliente no sistema.',
        description:
          'Autentica o cliente no sistema utilizando e-mail e senha gerenado um token de autenticação com um duração de 24h. Após 24h o token expira e o cliente deverá efetuar novo login.',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Objeto login',
            required: true,
            schema: {
              $ref: '#/definitions/Login',
            },
          },
        ],
        responses: {
          200: {
            description: 'Login efetuado com sucesso.',
            examples: {
              'application/json': {
                name: 'string',
                email: 'string',
                token: 'string',
              },
            },
          },
          400: {
            description: 'Erro de autenticação.',
          },
        },
      },
    },
  },
  definitions: {
    Customers: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
          description:
            'O campo e-mail é campo único, clientes não podem possuir um mesmo e-mail',
        },
        password: {
          type: 'string',
          description:
            'Senha precisa conter minimo de 8 caracteres, uma letra minuscula, uma maiuscula, um númoro e um caractere especial.',
        },
      },
      required: ['name', 'email', 'password'],
    },
    Movies: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        director: {
          type: 'string',
        },
        amount: {
          type: 'integer',
          description: 'Quantidade de filmes disponíveis para locação.',
        },
      },
      required: ['title', 'director', 'amount'],
    },
    Login: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      required: ['email', 'password'],
    },
  },
};

module.exports = swaggerDocument;
