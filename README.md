# Genetico

Production web application built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Tech stack

| Area       | Tooling                                         |
| ---------- | ----------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)              |
| Language   | TypeScript 5                                    |
| UI         | React 19, Tailwind CSS v4                       |
| Linting    | ESLint 9 (flat config) + `eslint-config-next`   |
| Formatting | Prettier (+ `prettier-plugin-tailwindcss`)      |
| Git hooks  | Husky + lint-staged + commitlint                |
| CI         | GitHub Actions (lint, typecheck, format, build) |

## Getting started

Requires Node.js `>= 20.11` (the repo pins **22** in `.nvmrc`).

```bash
nvm use            # optional
npm install        # installs deps and Husky hooks
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack) |
| `npm run build`        | Production build                 |
| `npm run start`        | Run the production build         |
| `npm run lint`         | Lint with ESLint                 |
| `npm run lint:fix`     | Lint and auto-fix                |
| `npm run typecheck`    | Type-check with `tsc --noEmit`   |
| `npm run format`       | Format all files with Prettier   |
| `npm run format:check` | Check formatting without writing |

## Environment variables

Copy `.env.example` to `.env.local` and fill in values. Variables prefixed with
`NEXT_PUBLIC_` are exposed to the browser; everything else stays server-side.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the branching model, commit conventions,
and PR workflow.

## Deployment

Optimized for [Vercel](https://vercel.com). Connect the repository and Vercel will
build and deploy automatically on every push to `main` (and create preview deployments
for pull requests).
