
# ChAMP SWE Track Backend Assignment (NestJS)

## Installation
First, create .env from .env.template, no need to change values of variables.
```bash
$ pnpm install

$ docker compose up

$ npx prisma generate

$ npx prisma db push
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

# Prisma Studio
$ npx prisma studio
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## API Documentation
You can view the API Docs at localhost:3000/api
