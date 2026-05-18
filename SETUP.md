# Guia de Setup (Passo a Passo)

Este guia explica como subir o projeto localmente e com Docker.

## 1) Pre-requisitos

- Node.js 20+
- Docker Desktop (opcional, recomendado)
- PostgreSQL local (opcional se usar Docker)

## 2) Clonar e preparar o ambiente

1. Copie o arquivo de variaveis de ambiente:

```bash
cp .env.example .env
```

2. Ajuste as variaveis conforme necessario:

- `DATABASE_URL`
- `AUTH_SECRET`
- `PDF_IMPORT_SOURCE`

## 3) Subir com Docker (recomendado)

1. Suba os containers:

```bash
docker-compose up --build
```

2. Em outro terminal, rode as migrations:

```bash
docker-compose exec app npm run prisma:migrate
```

3. Rode o seed (importacao automatica do PDF):

```bash
docker-compose exec app npm run prisma:seed
```

4. Acesse a aplicacao:

- http://localhost:3000

## 4) Rodar localmente (sem Docker)

1. Suba o PostgreSQL local e ajuste `DATABASE_URL`.

2. Instale as dependencias:

```bash
npm install
```

3. Rode as migrations:

```bash
npm run prisma:migrate
```

4. Rode o seed (importacao automatica do PDF):

```bash
npm run prisma:seed
```

5. Inicie o servidor:

```bash
npm run dev
```

6. Acesse a aplicacao:

- http://localhost:3000

## 5) Importacao do PDF (manual)

Caso queira reimportar a qualquer momento:

```bash
npm run import:pdf
```

Se estiver em Docker:

```bash
docker-compose exec app npm run import:pdf
```

## 6) Comandos uteis

- `npm run lint` (lint)
- `npm run build` (build de producao)
- `npm run start` (start em producao)

## 7) Dicas e observacoes

- Garanta que o arquivo PDF esteja no caminho definido em `PDF_IMPORT_SOURCE`.
- Para ambiente de producao, troque `AUTH_SECRET` e credenciais do banco.
- O parser e resiliente, mas pode precisar de ajustes conforme o PDF real.
