
# Frontend-APIMarketplace

Este projeto é o **Frontend** de um Marketplace para APIs, desenvolvido em Angular v16. Ele permite que os usuários explorem, adquiram e gerenciem APIs de diversos provedores.

## Repositório

Repositório oficial: [https://github.com/flavioaquino/Frontend-APIMarketplace](https://github.com/flavioaquino/Frontend-APIMarketplace)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão mínima recomendada: @v14.x@ ou superior)
- **npm** (versão mínima recomendada: @v6.x@ ou superior) ou **yarn**
- **Angular CLI** (recomendado: @v16.x@)

Caso não tenha nenhuma das ferramentas instaladas, as mesmas podem ser adquiridas da seguinte forma:

- **Node.js** 
O **Node.js** já vem com o **npm** (Node Package Manager). Para instalá-los:

1. Acesse o site oficial do Node.js: [https://nodejs.org](https://nodejs.org)
2. Baixe a versão recomendada (LTS).
3. Siga as instruções de instalação para o seu sistema operacional.

Após a instalação, você pode verificar se o Node.js e npm foram instalados corretamente com os seguintes comandos:

```
node -v
npm -v
```

Esses comandos devem exibir a versão do Node.js e npm instalados.

- **Angular CLI** 
O **Angular CLI** é necessário para gerenciar e compilar o projeto Angular. Para instalar a versão mais recente, use o npm ou yarn.

Usando npm:

```
npm install -g @angular/cli
```

Você pode verificar a versão instalada do Angular CLI com:

```
ng version
```

### Verificando a instalação:

```
node -v
npm -v
ng version
```

## Instalação

1. Clone o repositório:

```
git clone https://github.com/flavioaquino/Frontend-APIMarketplace.git
```

2. Acesse o diretório do projeto:

```
cd Frontend-APIMarketplace
```

3. Instale as dependências:

   Se estiver utilizando `npm`:

```
npm install
```

   Ou, se estiver utilizando `yarn`:

```
yarn install
```

## Ambiente de Desenvolvimento

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento, utilize:

```
ng serve
```

A aplicação estará disponível em [http://localhost:4200](http://localhost:4200).

### Build de Produção

Para gerar o build da aplicação para produção, execute:

```
ng build --prod
```

Os arquivos para deploy serão gerados na pasta **dist/**.

## Estrutura do Projeto

- **src/** - Contém o código-fonte da aplicação.
- **app/** - O núcleo da aplicação com componentes, serviços e módulos.
- **assets/** - Arquivos estáticos como imagens e fontes.
- **environments/** - Arquivos de configuração para diferentes ambientes (desenvolvimento, produção, etc).

## Testes

### Testes Unitários

Execute os testes unitários com o Karma:

```
ng test
```

### Testes End-to-End

Execute os testes end-to-end com Protractor:

```
ng e2e
```

## Deploy

Para fazer o deploy em um ambiente de produção:

1. Execute o build para produção:

```
ng build --prod
```

2. Os arquivos gerados na pasta **dist/** estarão prontos para serem enviados para um servidor web ou serviço de hospedagem.

## Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto.
2. Crie uma branch para a sua feature ou correção de bug:

```
git checkout -b feature/nova-feature
```

3. Commit suas alterações:

```
git commit -m 'Adiciona nova feature'
```

4. Envie para o branch principal:

```
git push origin feature/nova-feature
```

5. Abra um Pull Request.
