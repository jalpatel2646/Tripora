# Tripora / GlobeTrotter

Tripora is a travel-planning website for discovering destinations, creating trips, building itineraries, and managing travel plans.

## Start the website

Frontend:

```powershell
cd frontent
npm install
npm run dev
```

Open `http://localhost:5173`.

Backend:

```powershell
cd backend
npm install --no-audit --no-fund
npm run build
npm run start:dev
```

The API runs at `http://localhost:5000` and Swagger is available at `http://localhost:5000/api/docs`.

## Website workflow

### 1. First page: Home

URL: `/`

When the user opens the website, the Home dashboard opens first.

The Home page contains:

- Tripora logo: click to return to Home.
- Home: opens `/`.
- My Trips: opens `/my-trips`.
- Explore: opens `/explore`.
- Profile/avatar: opens `/profile`.
- Start Planning / Plan a Trip: opens `/create-trip`.
- Search: filters destinations and previous trips.
- Destination cards: show popular destinations.
- Previous trip cards: open the itinerary view.

### 2. Login

URL: `/login`

Open it from the Login link used by the registration flow.

On this page:

1. Enter email and password.
2. Click `Sign In`.
3. The frontend calls `POST /api/v1/auth/login`.
4. On success, the access token is saved and the user goes to `/`.
5. On failure, the authentication error appears on the form.

Click `Register` to open `/register`.

### 3. Registration

URL: `/register`

On this page:

1. Enter name, email, phone, city, country, bio, and password.
2. Upload a profile image if required.
3. Click `Create Account`.
4. The frontend calls `POST /api/v1/auth/register`.
5. On success, the session is saved and the user goes to `/`.
6. Click `Login` to return to `/login`.

### 4. Create a trip

URL: `/create-trip`

Open it by clicking `Start Planning`, `Plan a Trip`, or `Plan New Trip`.

On this page:

1. Enter a trip title.
2. Select a destination.
3. Select start and end dates.
4. Choose suggested activities.
5. Click `Create Itinerary`.
6. The frontend calls `POST /api/v1/trips`.
7. On success, the new trip ID is saved and the user goes to `/build-itinerary`.
8. Click `Cancel` to return to `/`.

### 5. Build itinerary

URL: `/build-itinerary`

This page is used to arrange travel sections, destinations, and activities. After reviewing the trip, continue to the itinerary view using the page action provided by the itinerary screen.

### 6. Itinerary view

URL: `/itinerary-view`

This page displays planned travel days, activities, timing, and budget information.

From here the user can:

- Review the complete itinerary.
- Open budget information.
- Edit itinerary items.
- Return to My Trips through the navigation bar.

### 7. My Trips

URL: `/my-trips`

Open it from the navbar or after returning from trip planning.

The page shows trips grouped by:

- Ongoing
- Upcoming
- Completed

Available actions:

- `View`: opens `/itinerary-view`.
- `Edit`: opens `/create-trip`.
- `Copy`: creates a local copy of a trip.
- `Delete`: asks for confirmation, then removes the trip.
- `Plan New Trip`: opens `/create-trip`.
- Search/filter/sort: changes the visible trip cards.

### 8. Explore

URL: `/explore`

Open it from the navbar.

The Explore page contains destination and activity discovery. Search or select a result to continue planning it from the trip creation flow.

### 9. Profile

URL: `/profile`

Open it by clicking the avatar or `Profile` in the navbar.

The page contains profile information, travel statistics, upcoming trips, previous trips, and saved travel information.

### 10. Fallback route

Any unknown URL redirects to Home (`/`).

## Main user journey

```text
Home (/)
  → Start Planning
Create Trip (/create-trip)
  → Create Itinerary
Build Itinerary (/build-itinerary)
  → Review itinerary
Itinerary View (/itinerary-view)
  → My Trips
My Trips (/my-trips)
  → View / Edit / Copy / Delete
```

## Backend connection

The frontend API client is located at `frontent/src/lib/api.js`.

By default it calls:

```text
http://localhost:5000/api/v1
```

Set `VITE_API_URL` when the backend is hosted somewhere else. Login, registration, trip creation, destination search, activity search, and trip listing use the backend API.

## Important environment security

Keep `backend/.env` private. It contains database credentials and JWT secrets and must never be committed to GitHub.
