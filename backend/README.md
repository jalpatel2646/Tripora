# GlobeTrotter Backend

NestJS REST API with MongoDB/Mongoose. API routes use `/api/v1`; Swagger is at `/api/docs`.

## Install and run locally

```powershell
cd backend
Copy-Item .env.example .env
npm install --no-audit --no-fund
docker compose up -d mongo
npm run start:dev
```

The dependency download command is:

```powershell
npm install --no-audit --no-fund
```

For a production build:

```powershell
npm run build
npm run start
```

MongoDB can be started with `docker compose up -d mongo`.

If Docker Desktop is unavailable on Windows and MongoDB is installed locally, start it with:

```powershell
New-Item -ItemType Directory -Force C:\data\db
& 'C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe' --dbpath C:\data\db --port 27017
```

The frontend uses `http://localhost:5000/api/v1` by default. Override it with `VITE_API_URL` when needed.
