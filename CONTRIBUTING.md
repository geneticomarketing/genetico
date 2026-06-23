# Contributing to Genetico

Thanks for contributing! This guide covers the workflow and conventions for the project.

## Prerequisites

- **Node.js** `>= 20.11` (the repo pins **22** via `.nvmrc` — run `nvm use`)
- **npm** (the project uses `package-lock.json`)

## Getting started

```bash
git clone https://github.com/singhalmanas23/Genetico.git
cd Genetico
nvm use            # optional, matches .nvmrc
npm install        # also sets up Husky git hooks
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Branching

- `main` is the protected, deployable branch. Don't commit to it directly.
- Create a branch per change: `feat/landing-hero`, `fix/nav-overflow`, `chore/deps-bump`.

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Commits are
validated by `commitlint` via a Husky `commit-msg` hook.

```
feat: add hero section to homepage
fix: correct mobile nav z-index
docs: update setup instructions
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## Code quality

A Husky `pre-commit` hook runs `lint-staged`, which auto-fixes and formats staged files.
Before opening a PR, make sure these all pass (CI runs them too):

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
```

Use `npm run lint:fix` and `npm run format` to fix issues automatically.

## Pull requests

1. Push your branch and open a PR against `main`.
2. Fill in the PR template and link any related issue.
3. CI must be green and the PR approved before merging.
4. Prefer **squash merge** to keep history clean.
