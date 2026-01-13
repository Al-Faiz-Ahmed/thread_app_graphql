# Thread App – GraphQL API

A minimal, typed GraphQL backend for a Threads-style experience, built with Express 5, GraphQL Yoga, and Prisma. The project focuses on a clean service layer, ergonomic developer tooling, and a ready-to-run Docker/Postgres setup.

## Table of Contents

1. [Highlights](#highlights)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Quick Start](#quick-start)
5. [Environment Variables](#environment-variables)
6. [Database & Prisma](#database--prisma)
7. [Available Scripts](#available-scripts)
8. [Running with Docker](#running-with-docker)
9. [GraphQL Usage](#graphql-usage)
10. [Troubleshooting](#troubleshooting)

## Highlights

- **Express + GraphQL Yoga** with built-in GraphiQL playground at [`/graphql`](http://localhost:4000/graphql).
- **Prisma ORM** (PostgreSQL) with type-safe client emitted to `src/generated/prisma`.
- **Modular schema/resolvers** organized per feature (see `src/graphql/modules`).
- **Typed context** for resolvers to share Prisma client and request metadata.
- **Docker Compose** recipe for a local Postgres 16 instance.

## Tech Stack

| Layer          | Library / Tool                     |
| -------------- | ---------------------------------- |
| Runtime        | Node.js (ES Modules)               |
| Web framework  | Express 5                          |
| GraphQL server | GraphQL Yoga                       |
| ORM            | Prisma (PostgreSQL)                |
| Types / build  | TypeScript, `tsc`, `tsx`, `tsc-watch` |
| Env / tooling  | dotenv, cors, Docker Compose       |

## Architecture

```
src/
├── graphql/
│   ├── context/           # GraphQL context factory (Prisma, request info)
│   ├── modules/           # Feature modules: typeDefs, queries, mutations, resolvers, services
│   ├── schema.ts          # Root schema + module aggregation
│   ├── resolvers.ts       # Module resolver aggregation
│   └── index.ts           # Creates GraphQL schema for Yoga
├── lib/config/            # Env + Prisma config
├── middleware/            # Express global middleware (JSON, CORS, etc.)
├── index.ts               # Express bootstrap + Yoga mount
└── generated/prisma/      # Prisma client output (gitignored)
```

> Tip: Add new domains by creating a folder in `src/graphql/modules/<domain>` with `*.type.ts`, `*.query.ts`, `*.mutation.ts`, and resolvers/services.

## Quick Start

### Prerequisites

- Node.js ≥ 18
- npm (or pnpm/yarn if preferred)
- Docker Desktop (optional, for Postgres container)

### Installation

```bash
git clone <repo-url>
cd thread_app
npm install
cp .env.example .env  # create your environment file (see below)
```

### Boot the API

```bash
npm run devv   # tsx watch mode
# or
npm run dev    # type-check + rebuild + start (tsc-watch)
```

Server boots on `http://localhost:${PORT || 4000}` with:

- Landing page: `GET /`
- GraphQL endpoint: `POST /graphql`
- GraphiQL playground: `GET /graphql`

## Environment Variables

Create a `.env` file in the repo root. Minimum variables:

```env
PORT=4000
DATABASE_URL="postgresql://postgres:rooter@localhost:4056/threads_db?schema=public"
```

When using Docker Compose the connection above matches the local container credentials.

## Database & Prisma

1. **Start Postgres** (Docker instructions below or use your own instance).
2. **Generate client + run migrations:**

   ```bash
   npm run db:migrate
   ```

   This executes `prisma migrate dev` and regenerates the Prisma client.

3. **Schema location:** `prisma/schema.prisma` (currently contains a `User` model).

> Note: The Prisma client output path is configured to `src/generated/prisma` so it can be imported using TypeScript path aliases.

## Available Scripts

| Script          | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `npm run dev`   | Watches TypeScript, rebuilds with `tsc`, runs alias fixer, then restarts app |
| `npm run devv`  | Fast `tsx watch` runner (recommended during active development)             |
| `npm run build` | Compiles TypeScript to `build/` and fixes path aliases                      |
| `npm start`     | Runs the compiled server (`node build/index.js`)                            |
| `npm run db:migrate` | Runs `prisma migrate dev` and `prisma generate`                         |

## Running with Docker

Only the database is containerized right now. To start Postgres 16 with persisted volume:

```bash
docker compose up -d
```

This exposes Postgres on `localhost:4056` with credentials declared in `docker-compose.yml`. After the DB is up, run the migrations and start the app locally.

To stop and remove the containers:

```bash
docker compose down
```

## GraphQL Usage

- **Endpoint:** `http://localhost:4000/graphql`
- **Playground:** Open the same URL in a browser for GraphiQL.

### Sample Mutation – Create User

```graphql
mutation CreateUser {
  createUser(
    input: {
      username: "faizan"
      email: "faizan@example.com"
      password: "supersecret"
      firstName: "Faizan"
      lastName: "Ahmed"
    }
  )
}
```

Returns the newly created user ID.

### Sample Mutation – Update User

```graphql
mutation UpdateUser {
  updateUser(
    input: {
      id: "USER_UUID"
      username: "faizan"
      firstName: "Faizan"
      lastName: "Ahmed"
      profileImageURL: "https://example.com/avatar.png"
    }
  ) {
    id
    username
    firstName
    lastName
    profileImageURL
  }
}
```

### Sample Mutation – Delete User

```graphql
mutation DeleteUser {
  deleteUser(id: "USER_UUID")
}
```

The current sample `Query` field (`_empty`) simply returns a placeholder string. Extend `user.query.ts` and `user.resolver.ts` with real queries as you evolve the API.

## Troubleshooting

| Issue | Fix |
| ----- | --- |
| `Error: P1001 - Can't reach database server` | Ensure Docker Postgres is running or update `DATABASE_URL`. |
| `Cannot find module 'src/...` during runtime | Run `npm run build` or ensure `tsc-alias` executed (use `npm run dev`). |
| GraphiQL shows schema mismatch | Re-run `npm run db:migrate` to regenerate Prisma client and restart the server. |
| Port already in use | Change `PORT` in `.env` or free the port. |

---

Happy hacking! Feel free to extend the schema, add new modules, or wire up authentication as your Threads clone evolves.