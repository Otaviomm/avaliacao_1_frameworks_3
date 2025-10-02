# CyberLibrary - Biblioteca de Jogos

## Descrição
Uma aplicação web para gerenciar uma biblioteca de jogos, desenvolvida com Vue 3 e Vuetify 3, e com uma estética inspirada no universo Cyberpunk. Este projeto cumpre os requisitos da Avaliação 1 de Frameworks Modernos.

## Integrantes do Grupo
* **Nome Completo:** [Seu Nome Aqui] - **Matrícula:** [Sua Matrícula]

## Como Executar
1. Clone este repositório.
2. Navegue até a pasta do projeto: `cd cyberpunk-game-library`
3. Instale as dependências: `npm install`
4. Execute o servidor de desenvolvimento: `npm run dev`

A aplicação estará disponível em `http://localhost:5173`.

---

## Funcionalidades Principais

A CyberLibrary foi projetada para ser uma ferramenta intuitiva para todo gamer. Aqui está um resumo de como utilizá-la:

* **Visualizar a Biblioteca (`/library`):** A página principal da biblioteca exibe sua coleção em formato de cards visuais. Aqui você pode:
    * **Buscar** por um jogo específico usando a barra de busca.
    * **Ordenar** sua coleção por nota ou por ordem alfabética.

* **Gerenciar Jogos (`/`):** A página de gerenciamento apresenta seus jogos em uma tabela detalhada, ideal para as seguintes ações:
    * **Adicionar um Jogo:** Clique no botão "Adicionar Jogo" para abrir o formulário e catalogar um novo título, incluindo uma capa e anotações pessoais.
    * **Editar um Jogo:** Clique no ícone de lápis (✏️) ao lado de um jogo para abrir o formulário e atualizar suas informações.
    * **Excluir um Jogo:** Clique no ícone de lixeira (🗑️) para remover um jogo. Um diálogo de confirmação aparecerá para evitar exclusões acidentais.

* **Ver Detalhes do Jogo:** Ao clicar em qualquer card na página da biblioteca, você será levado a uma página de detalhes exclusiva para aquele jogo, onde poderá ver a capa em tamanho maior e ler suas anotações pessoais.

* **Consultar Estatísticas (`/about`):** A página "Sobre" não só descreve o projeto, mas também exibe estatísticas em tempo real da sua coleção, como o número total de jogos e a contagem por gênero.