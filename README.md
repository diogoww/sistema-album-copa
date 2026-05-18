# Sistema Album da Copa

Aplicacao fullstack para controle de figurinhas da Copa do Mundo.

## Stack

- Next.js 15 + React + TypeScript
- TailwindCSS + shadcn/ui
- Prisma ORM + PostgreSQL
- Auth.js (NextAuth v5) + JWT
- Docker + docker-compose

## Requisitos

- Node.js 20+
- Docker (opcional, recomendado)

## Como rodar (local)

1) Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

2) Suba o banco:

```bash
docker-compose up -d db
```

3) Instale dependencias:

```bash
npm install
```

4) Rode as migrations e o seed:

```bash
npm run prisma:migrate
npm run prisma:seed
```

5) Inicie a aplicacao:

```bash
npm run dev
```

## Guia detalhado

Veja o passo a passo completo em [SETUP.md](SETUP.md).

## Importacao do PDF

Por padrao, o sistema usa `tabelaControleFigurinhas.pdf` na raiz.

```bash
npm run import:pdf
```

## Docker completo

```bash
docker-compose up --build
```

## Estrutura

- src/app: paginas e API Routes
- src/lib: utilitarios, auth, seguranca, importacao
- prisma: schema e migrations
- scripts: seeds e importadores

## Seguranca

- Hash Argon2
- Rate limiting basico
- Validacao com Zod
- Sanitizacao de inputs
- Headers de seguranca no middleware

## Observacoes

- Coloque `PDF_IMPORT_SOURCE` no .env se o PDF estiver em outro caminho.
- O parser e resiliente para PDFs mal formatados, mas pode ser ajustado conforme o arquivo real.
