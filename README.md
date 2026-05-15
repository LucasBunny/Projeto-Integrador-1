# Projeto Integrador

Sistema de agendamento de horários para barbearias, desenvolvido como projeto integrador.  
O sistema permite o cadastro de clientes, serviços e agendamentos através de uma interface web integrada a uma API backend com banco de dados MySQL.

---

## Funcionalidades

- Cadastro de clientes
- Cadastro de serviços
- Criação de agendamentos
- Integração entre frontend e backend
- Persistência de dados com MySQL

---

## Estrutura do Projeto

```text
Projeto-Integrador-1/
 ├── frontend/   -> Interface do sistema
 ├── backend/    -> API Node.js + MySQL
```

---

## Tecnologias Utilizadas

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express
- MySQL2
- Dotenv
- Nodemon

### Banco de Dados
- MySQL Server
- MySQL Workbench

---

# Como executar o projeto

## Backend

### 1. Instalar dependências

```bash
cd backend
npm install
```

---

### 2. Configurar variáveis de ambiente

Criar um arquivo `.env` dentro da pasta `backend` usando o `.env.example`.

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=projeto_integrador
```

---

### 3. Configurar banco de dados

Executar o arquivo:

```text
backend/database.sql
```

no MySQL Workbench.

---

### 4. Rodar backend

```bash
npm run dev
```

Servidor:

```text
http://localhost:3000
```

---

## Requisitos

- Node.js instalado
- MySQL Server instalado
- MySQL Workbench (opcional, mas recomendado)

---

## Observações

- O arquivo `.env` não deve ser enviado para o GitHub.
- A pasta `node_modules` é gerada automaticamente pelo `npm install`.
- O backend utiliza a porta `3000` por padrão.