

---# 🕹️ CyberLibrary v2.0 - Full Stack Edition

## 👥 Integrantes do Grupo

* **Nome Completo:** GUILLERMO GILIOLI DE PAULA COELHO - **Matrícula:** 20230004948
* **Nome Completo:** KAIKY MARÇAL FERREIRA - **Matrícula:** 20230023649
* **Nome Completo:** OTÁVIO MANIEZZO MILAN - **Matrícula:** 20230009247

## 📖 Descrição do Projeto

A **CyberLibrary** é uma aplicação web robusta para gerenciamento de coleções de jogos, desenvolvida com uma arquitetura **Full Stack**. O projeto utiliza a estética Cyberpunk 2077 e evoluiu de uma aplicação estática para um sistema dinâmico integrado à nuvem.

Esta versão cumpre todos os requisitos da **Avaliação 2** da disciplina de Frameworks Modernos, implementando persistência em banco de dados, API REST própria e autenticação segura via Google.

---

## 🛠️ Stack Tecnológica

O projeto foi dividido em duas camadas principais:

### **Frontend (Client)**
* **Framework:** Vue.js 3 (Composition API)
* **UI Library:** Vuetify 3 (Material Design com tema Cyberpunk customizado)
* **Gerenciamento de Estado:** Pinia (Persistência de sessão de usuário)
* **Roteamento:** Vue Router (Com guardas de navegação/rotas protegidas)
* **Requisições HTTP:** Axios
* **Build Tool:** Vite

### **Backend (Server & DB)**
* **Servidor:** Node.js + Express
* **Banco de Dados:** Supabase (PostgreSQL)
* **Autenticação:** Google OAuth 2.0 (Integrado via Supabase Auth)
* **Segurança:** CORS habilitado

---

## 🚀 Como Executar o Projeto

Como esta é uma aplicação Full Stack, é necessário rodar o **Backend** e o **Frontend** em terminais separados.

### Pré-requisitos
* Node.js instalado (v18 ou superior).
* Conta no Supabase configurada.

### 1️⃣ Configuração do Backend (Terminal 1)

O backend é responsável por conectar ao banco de dados e servir a API.

1.  Acesse a pasta do servidor:
    ```bash
    cd backend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  **Configuração de Ambiente (.env):**
    Certifique-se de que existe um arquivo chamado `.env` dentro da pasta `backend` com as suas credenciais do Supabase:
    ```env
    SUPABASE_URL=sua_url_do_supabase
    SUPABASE_KEY=sua_chave_anonima
    ```

4.  Inicie o servidor:
    ```bash
    node server.js
    ```
    > ✅ *Você deve ver a mensagem: "Servidor rodando na porta 3000"*

---

### 2️⃣ Configuração do Frontend (Terminal 2)

O frontend é a interface visual que o usuário interage.

1.  Abra um **novo terminal** e acesse a pasta da aplicação:
    ```bash
    cd cyberpunk-game-library
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Inicie a aplicação:
    ```bash
    npm run dev
    ```
    > ✅ *Acesse o link gerado (geralmente http://localhost:5173)*

---

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação e Segurança
* **Login Social:** Autenticação segura utilizando conta Google.
* **Proteção de Rotas:** Usuários não autenticados são redirecionados para o login ao tentar acessar a biblioteca.
* **Gestão de Sessão:** O Pinia mantém o usuário logado mesmo após recarregar a página.

### 💾 CRUD Completo (Integrado ao Supabase)
* **Create:** Adicionar novos jogos salva os dados diretamente no PostgreSQL.
* **Read:** A listagem consome a API do Express para exibir dados atualizados.
* **Update:** Edição de informações (título, nota, gênero, etc.) em tempo real.
* **Delete:** Remoção de jogos do banco de dados.

### 🎨 Interface e UX
* **Dashboard:** Página "Sobre" com estatísticas reais vindas do banco de dados (Total de jogos, Gráfico de gêneros).
* **Tema Personalizado:** Estilo visual inspirado em Cyberpunk 2077.
* **Filtros:** Busca dinâmica e ordenação no Frontend.

---

> **Professor(a):** Para testar a aplicação, certifique-se de que ambos os terminais (Backend na porta 3000 e Frontend na porta 5173) estejam ativos simultaneamente.