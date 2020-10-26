Como iniciar a API
------------------

Necessário ter instalado:
 * node v8.* ou superior
 * npm  v5.* ou superior

Navegar até a pasta da api
 cd CAMINHO/PARA/ESTE/PROJETO
 cd api

Instalar as dependências
 npm install

Iniciar o servidor
 npm run server:run

Rotas da API
------------

Método: GET
Rota: http://localhost:3000/api/product
Parâmetros da requisição:
 Consulta:
  * q: string não obrigatória
Tipo de retorno: Array
Exemplos de requisição:
 * GET /api/product
  - retorno: todos os produtos
 * GET /api/product?q=bicic
  - retorno: todos os produtos que contenham "bicic"
Exemplo de retorno:
[
    {
        "name": "Produto",
        "brand": "Marca",
        "quantity": 30,
        "category": {
            "id": 1,
            "name": "Esportes"
        },
        "id": 1
    },
    {
        "name": "Outro produto",
        "brand": "Marca diferente",
        "quantity": 10,
        "category": {
            "id": 3,
            "name": "Lazer"
        },
        "id": 2
    }
]
____________________________________________________________

Método: GET
Rota: http://localhost:3000/api/product/{productId}
Parâmetros da requisição:
 Caminho:
  * productId: id do produto
Tipo de retorno: JSON
Exemplos de requisição:
 * GET /api/product/1
  - retorno: produto de id 1
 * GET /api/product/100, retorno: produto de id 100
  - retorno: produto de id 100
Exemplo de retorno:
{
    "name": "Produto",
    "brand": "Marca",
    "quantity": 30,
    "category": {
        "id": 1,
        "name": "Esportes"
    },
    "id": 1
},
____________________________________________________________

Método: POST
Rota: http://localhost:3000/api/product
Parâmetros da requisição:
 Payload:
  * name: string obrigatória
  * brand: string obrigatória
  * quantity: inteiro obrigatório
  * category: inteiro id da categoria obrigatório
Tipo de retorno: JSON
Exemplos de requisição:
 * POST /api/product
  - payload: {
        name: "Produto",
        brand: "Marca",
        quantity: 100,
        category: 1
    }
  - retorno: produto criado
Exemplo de retorno:
{
    "name": "Produto",
    "brand": "Marca",
    "quantity": 30,
    "category": 1,
    "id": 1
},
____________________________________________________________

Método: PATCH
Rota: http://localhost:3000/api/product/{productId}
Parâmetros da requisição:
 Caminho:
  * productId: id do produto
 Payload:
  * name: string não obrigatória
  * brand: string não obrigatória
  * quantity: inteiro não obrigatório
  * category: inteiro id da categoria não obrigatório
Tipo de retorno: JSON
Exemplos de requisição:
 * PATCH /api/product/1
  - payload: {
        name: "Produto editado",
        brand: "Marca editada"
    }
  - retorno: produto de id 1 editado
Exemplo de retorno:
{
    "name": "Produto editado",
    "brand": "Marca editada",
    "quantity": 30,
    "category": 1,
    "id": 1
},
____________________________________________________________

Método: DELETE
Rota: http://localhost:3000/api/product/{productId}
Parâmetros da requisição:
 Caminho:
  * productId: id do produto
Tipo de retorno: NULL
Exemplos de requisição:
 * DELETE /api/product/1
  - retorno: null
____________________________________________________________

Método: GET
Rota: http://localhost:3000/api/category
Parâmetros da requisição:
 Consulta:
  * q: string não obrigatória
Tipo de retorno: Array
Exemplos de requisição:
 * GET /api/category
  - retorno: todas as categorias
 * GET /api/product?q=laz
  - retorno: todas as categorias que contenham "laz"
Exemplo de retorno:
[
    {
        "id": 1,
        "name": "Esportes"
    },
    {
        "id": 2,
        "name": "Eletrônicos"
    },
    {
        "id": 3,
        "name": "Lazer"
    }
]

Objetivos
---------

1. Criar um CRUD de produtos
 1.1 Utilizar a rota de buscar todos os produtos e montar uma tabela com os dados
  * Adicionar campo de texto para filtrar dados, mandando "q" como consulta para a API
 1.2 Adicionar um botão de criar novo produto
  * No campo categoria montar um select2, buscando os dados da categoria na API,
   possibilitando filtrar dados, mandando "q" como consulta para a API
 1.3 Adicionar botão na tabela para editar produto, pelo seu id
 1.4 Adicionar botão na tabela para deletar produto, pelo seu id
