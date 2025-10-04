# CyberLibrary - Biblioteca de Jogos

## 📖 Sobre o Projeto

Este projeto é uma aplicação web completa para gerenciamento de uma biblioteca de jogos, desenvolvida com **Vue 3** e **Vuetify 3**. O tema escolhido foi **Cyberpunk 2077**, inspirando a paleta de cores neon, a tipografia futurista e a estética geral da interface.

A aplicação cumpre todos os requisitos da Avaliação 1 da disciplina de Frameworks Modernos para Desenvolvimento de Sistemas.

## 👥 Integrantes do Grupo

* **Nome Completo:** GUILLERMO GILIOLI DE PAULA COELHO - **Matrícula:** 20230004948
* **Nome Completo:** KAIKY MARÇAL FERREIRA - **Matrícula:** 20230023649
* **Nome Completo:** OTÁVIO MANIEZZO MILAN - **Matrícula:** 20230009247

---

## 🚀 Como Instalar e Executar

Siga os passos abaixo para rodar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

* **Node.js:** Versão 18.x ou superior.
* **NPM** (geralmente instalado junto com o Node.js).

### Passos de Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd cyberpunk-game-library
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Após executar o último comando, a aplicação estará disponível no seu navegador, geralmente em `http://localhost:5173`.

---

## 🏛️ Estrutura de Rotas e Componentes

O projeto é organizado com uma arquitetura baseada em componentes para garantir reusabilidade e manutenção.

### Rotas Principais

* `/` (**Gerenciar**): Página principal com uma tabela (`v-data-table`) para realizar as operações de CRUD (Criar, Ler, Atualizar e Deletar) nos jogos.
* `/library` (**Biblioteca**): Exibe a coleção de jogos em formato de cards visuais. Inclui funcionalidades de busca por nome e ordenação.
* `/about` (**Sobre**): Apresenta informações sobre o projeto, as tecnologias utilizadas e estatísticas dinâmicas sobre a biblioteca.
* `/game/:id` (**Detalhes do Jogo**): Rota dinâmica que exibe informações detalhadas de um jogo específico, incluindo as anotações pessoais do usuário.

### Componentes Chave

* `AppBar.vue`: A barra de navegação superior, contendo o título com efeito "glitch" e os links para as principais rotas.
* `GameForm.vue`: Um componente reutilizável que contém o diálogo (`v-dialog`) e o formulário para adicionar ou editar jogos, incluindo validações de campos.

---

## ✨ Funcionalidades Principais

* **Visualizar a Biblioteca (`/library`):**
    * Buscar por um jogo específico usando a barra de busca.
    * Ordenar a coleção por nota ou por ordem alfabética.
* **Gerenciar Jogos (`/`):**
    * Adicionar, editar e excluir jogos da sua coleção.
    * Diálogo de confirmação para evitar exclusões acidentais.
* **Ver Detalhes do Jogo:**
    * Página exclusiva para cada jogo com capa em destaque e anotações pessoais.
* **Consultar Estatísticas (`/about`):**
    * Exibe em tempo real o total de jogos e a contagem por gênero.