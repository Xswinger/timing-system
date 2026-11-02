# TimingSystem stub backend

This Express service implements the HTTP routes currently used by the Angular
client. It returns deterministic in-memory responses and does not persist POST
requests.

## Run locally

```bash
cd backend
npm ci
npm start
```

The server listens on `http://127.0.0.1:3000` by default. Use `PORT` and `HOST`
to override the bind address. Check readiness with:

```bash
curl http://127.0.0.1:3000/health
```

## Routes

- `GET /health`
- `GET /api/get_events/`
- `GET /api/scoreboard/:eventId`
- `POST /api/login/`
- `POST /api/create_user/`
- `POST /api/post_time/`
- `POST /api/add_event/`
- `POST /api/finish_event/:eventId`

The existing WebSocket URL is outside this HTTP stub's scope.

Run the integration tests with `npm test`.
