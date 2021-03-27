# 📼 locadora-api

API em node JS para sistema de locadora

# 🐬 Configurando banco de dados MySQL

Antes de rodar a API é necessário preparar o banco de dados.

No MySQL, rode os scripts de criação das bases e das tabelas necessárias, que estão disponíves na pasta [database](https://github.com/gustavolarsen/locadora-api/tree/main/database)

- Para criar a base de desenvolvimento rode o script `SQL_CREATE_TABLES_locadoradb.sql`

- Para criar a base de testes itegrados rode o script `SQL_CREATE_TABLES_locadoradb_test.sql`´

# 🔨 Configurando a API em ambiente de DSV

```bash
# Clone o repositórioo
$ git clone https://github.com/gustavolarsen/locadora-api.git

# Acesse a pasta do projeto
$ cd locadora-api

# Instale as dependencias
$ yarn install
```

# 📁 Configuração dos arquivos de ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte estrutura,
substituindo os valores das variáveis conforme os dados do seu banco. Este arquivo servirá para o ambiente de DSV

```
DB_NAME=locadoradb
DB_USER=usuariodobanco
DB_HOST=localhost
DB_PASS=senhadobanco
DB_PORT=3306

JWT_SECRET=seutokensecreto
```

Crie um arquivo `.env.test` na raiz do projeto com a seguinte estrutura,
substituindo os valores das variáveis conforme os dados do seu banco. Este arquivo servirá para o ambiente de testes integrados.

```
DB_NAME=locadoradb_test
DB_USER=usuariodobanco
DB_HOST=localhost
DB_PASS=senhadobanco
DB_PORT=3306

JWT_SECRET=seutokensecreto
```

# 🔍 Rodando os testes integrados e unitários

```bash
# Acesse a pasta do projeto
$ cd locadora-api

# Rode os testes
$ jest
```

# 🔥 Rodando a API em DSV

```bash
# Acesse a pasta do projeto
$ cd locadora-api

# Rode a API
$ yarn dev
```

# 📋 Documentação dos Endpoints

Para detalhes da documentação da API acessar este link [https://app.swaggerhub.com/apis-docs/gustavolarsen/swagger-locadora/1.0.0](https://app.swaggerhub.com/apis-docs/gustavolarsen/swagger-locadora/1.0.0)

# 👩🏼‍🦲 Autor

API desenvolvida por Gustavo Larsen

# 📃 Licença

Estr projeto está sob a licença MIT - acesse [LICENSE](https://github.com/gustavolarsen/dev-radar-api/blob/main/LICENSE) para mais detalhes.
