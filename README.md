# 💸 App de Finanças - CRUD com Next.js e Prisma

Este é um aplicativo simples de controle financeiro, onde é possível cadastrar entradas e saídas, editar, excluir e visualizar transações. A aplicação foi construída com foco em aprendizado de backend utilizando o App Router do Next.js e Prisma ORM.

---

## 🚀 Tecnologias Utilizadas

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [React](https://reactjs.org/)
- [Prisma ORM](https://www.prisma.io/docs)
- [SQLite](https://www.sqlite.org/index.html)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)

---

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/PicantePuppet15/crud-financeiro.git
cd crud-financeiro
npm install
```

## 🗃️ Configuração do Banco de Dados

Este projeto utiliza **Prisma com SQLite**. Siga os passos abaixo para configurar o banco:

1. Inicialize o Prisma:
```bash
npx prisma init
```

2. No arquivo `.env`, configure a URL do banco:
```bash
DATABASE_URL="file:./dev.db"
```

3. Crie e aplique as migrações:
```bash
npx prisma migrate dev --name init
```

4. Gere o cliente Prisma:
```bash
npx prisma generate
```

## ▶️ Executando o Projeto

Para rodar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```
Abra no navegador: http://localhost:8080

## 📌 Funcionalidades
 
- Criar transações (entrada e saída)

- Listar transações

- Editar transações

- Deletar transações

- Validação de formulários com Zod

- Estilização com Tailwind CSS

