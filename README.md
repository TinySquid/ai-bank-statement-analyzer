# AI Bank Statement Analyzer

Given an arbitrary bank statement PDF, utilize AI to analyze and provide insights and generate a report.

## Example Output

![example report](/assets/example-output.png)

## Architecture

### Flow Outline

![flow](/assets/flow-image.png)

### Stack

![stack](/assets/stack.png)

### Database Modeling

![db](/assets/database-model.png)

### Notes

![notes](/assets/AI-notes.png)

## Setup (Local Dev)

Ensure you have `./frontend/.env` and `./backend/.env` setup correctly.

From project root directory:

- `yarn install`
- `yarn prisma:generate`

Then stand up the services for the backend:

- `docker compose up postgres redis`

Now migrate / seed the db:

- `yarn setup:backend`

Now you can run the entire app with

- `yarn dev`

Frontend is on http://localhost:5173

Backend is on http://localhost:3000

## Setup (Docker)

Ensure you have `./frontend/.env` and `./backend/.env` setup correctly.

From project root directory:

- `docker compose up`

Frontend is on http://localhost:5173

Backend is on http://localhost:3000

## Additional Scripts

- `yarn prepare` - setup for husky precommit hooks

### Backend

- `yarn db:explore` (Spins up browser to view database using prisma at http://localhost:5555)
- `yarn db:reset` (nuke it)

## Backend .env

The only thing to change when using the docker setup is `DATABASE_URL` (uncomment the one with localhost if working locally):

- `DATABASE_URL="postgresql://mr_krabs:secretformula@localhost:5432/krusty_krab?schema=public`

And uncomment `REDIS_HOST` and `REDIS_PORT` as well if running with docker.

Be sure to add your `OPENAI_API_KEY` regardless.

```
NODE_ENV="development"

# Express Server
PORT=3000
CORS_WHITELIST="http://localhost:3000, http://localhost:5173"

# Database
POSTGRES_USER="mr_krabs"
POSTGRES_PASSWORD="secretformula"
POSTGRES_HOST="postgres"
POSTGRES_PORT=5432
POSTGRES_DB="krusty_krab"

DATABASE_URL="postgresql://mr_krabs:secretformula@localhost:5432/krusty_krab?schema=public"
# DATABASE_URL="postgresql://mr_krabs:secretformula@postgres:5432/krusty_krab?schema=public"

# Redis for Queue
# REDIS_HOST=redis
# REDIS_PORT=6379

# Local Storage
FILE_UPLOAD_MAX_SIZE_BYTES=52428800

# OpenAI
OPENAI_API_KEY="sk-proj-ABCD1234"
```
