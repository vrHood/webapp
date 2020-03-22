# vr*Hood Web App

## Docker

Run in project root:

```
docker-compose up --build -d
```

## API

The backend will expose an API on port 3030 (for development: http://localhost:3030).

To authenticate, send a `POST` request with following data to `http://localhost:3030/authentication`:

HEADERS:
```
Content-Type: application/json
```

BODY:
```
{
    "strategy": "local",
    "email": "...",
    "password": "..."
}
```

An initial user is created in `development` mode - see `backend/config/development.json`.
