# Blog API Scaffold

This project is a deliberately small but production-oriented starting point for a Node.js API built with Express and PostgreSQL. It focuses on structure, boundaries, and operational basics instead of feature logic.

## Why this structure

The goal is to separate concerns early so the codebase stays manageable as it grows:

- `src/app.js`: configures Express and middleware. This file builds the app, but does not start the process.
- `src/server.js`: starts the HTTP server and owns shutdown behavior.
- `src/config/`: environment parsing and infrastructure configuration such as PostgreSQL.
- `src/routes/`: HTTP route registration and versioning.
- `src/controllers/`: translates HTTP requests into application calls.
- `src/services/`: place for business logic once the project grows.
- `src/repositories/`: data-access layer for PostgreSQL queries.
- `src/middlewares/`: centralized cross-cutting concerns like error handling.
- `src/utils/`: small reusable helpers such as logging and async wrappers.

This separation matters because HTTP concerns, business rules, and database concerns change for different reasons. Keeping them isolated reduces coupling and makes testing easier later.

## Included best practices

- Environment-driven configuration through `.env` and `.env.example`
- Centralized logger with Pino
- Security middleware with Helmet
- Configurable CORS
- Basic rate limiting
- Graceful shutdown for the HTTP server and PostgreSQL pool
- Versioned routes under `/api/v1`
- Centralized 404 and error handlers
- A health endpoint that checks app and database readiness without introducing domain logic

## Project layout

```text
src/
	app.js
	server.js
	config/
		db.js
		env.js
	controllers/
		health.controller.js
	middlewares/
		error-handler.js
		not-found.js
	repositories/
		health.repository.js
	routes/
		index.js
		v1/
			health.routes.js
			index.js
	services/
		health.service.js
	utils/
		async-handler.js
		logger.js
```

## Run locally

1. Install dependencies:

	 ```bash
	 npm install
	 ```

2. Make sure PostgreSQL is running and update your `.env` if needed.

3. Start the API in development mode:

	 ```bash
	 npm run dev
	 ```

4. Check the endpoints:

	 - `GET /`
	 - `GET /api/v1/health`

## Environment variables

The scaffold uses these variables:

- `NODE_ENV`: `development`, `test`, or `production`
- `HOST`: host interface the server binds to
- `PORT`: HTTP port
- `API_PREFIX`: base API prefix, default `/api`
- `API_VERSION`: route version, default `v1`
- `DATABASE_URL`: PostgreSQL connection string
- `DB_SSL`: enables SSL for managed Postgres deployments
- `CORS_ORIGIN`: `*` or a comma-separated allowlist
- `TRUST_PROXY`: set to `true` when behind a reverse proxy
- `RATE_LIMIT_WINDOW_MS`: rate limit window size in milliseconds
- `RATE_LIMIT_MAX`: max requests allowed in that window

## Notes for learning

- `app.js` and `server.js` are intentionally separate. This is a common production pattern because it keeps the app reusable for tests and makes process lifecycle code easier to reason about.
- The health feature is the only example route because scaffolding should teach structure, not bury you in placeholder business code.
- The repository and service layers may feel thin right now. That is normal. They become useful once the project starts accumulating real rules and queries.