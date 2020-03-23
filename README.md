# vr*Hood Web App

## Getting started

### Requirements:

- Node 12.16.*
- Docker Desktop

### Installation

**Backend**
```
cd backend
npm i
```

**Frontend**
```
cd frontend
npm i
```

**Types**
```
cd types
npm i
```

### Running the application

**Database & API**

*Run in project root*
```
docker-compose up --build -d
```

**Frontend**

*Run in `frontend/`*
```
ng serve
```

**OR start complete stack via docker-compose**
```
docker-compose -f docker-compose-dev.yml up
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
