<div align="center">
  <h1>🌍 Tripora - Your Ultimate Travel Planner ✈️</h1>
  <p>An intuitive, feature-rich travel-planning website designed to help you discover new destinations, seamlessly create trips, build detailed itineraries, and easily manage all your travel plans in one place! 🎒🗺️</p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

---

## ✨ Features

- **🏠 Interactive Dashboard:** Effortlessly manage ongoing, upcoming, and completed trips from a single hub.
- **🔐 Secure Authentication:** Seamless user login and registration protected by reliable JWT-based security.
- **🧭 Destination Discovery:** Easily explore popular, trending destinations as well as hidden gems.
- **📅 Advanced Trip Builder:** Formulate itineraries, seamlessly plan travel dates, and select curated activities manually or dynamically.
- **💰 Budget & Timing Tracking:** Maintain complete visibility of your travel expenses and daily schedules.
- **👤 Dedicated User Profiles:** Monitor your travel statistics, save essential travel information, and manage your personal details.

---

## 🛠️ Tech Stack

### 🎨 Frontend
- **Core:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/) for a lightning-fast development experience ⚡
- **Routing:** React Router v7 for robust navigation 🗺️
- **UI Elements:** Lucide React for consistent iconography ✨ & Recharts for data visualization 📊
- **Development Tooling:** Oxlint for blazing-fast code linting 🚀

### ⚙️ Backend
- **Framework:** [NestJS](https://nestjs.com/) (Node.js framework) providing a scalable architectural structure 🦁
- **Database:** MongoDB managed with [Mongoose](https://mongoosejs.com/) 🍃
- **Security:** Hardened with Helmet, bcrypt password hashing, and JWT for session management 🔒
- **Documentation:** Built-in Swagger UI (OpenAPI standard) for full developer convenience 📄
- **Language:** Completely typed using TypeScript 💙

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have globally installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/Tripora.git
cd Tripora
```

### 2️⃣ Backend Setup
Navigate to the backend directory and fire up the server:

```bash
cd backend

# Install dependencies (skipping audit/fund for speed)
npm install --no-audit --no-fund

# Build the project
npm run build

# Start the application in development mode
npm run start:dev
```
> **Note:** The backend API listens on `http://localhost:5000` by default. You can view the comprehensive API documentation via Swagger at `http://localhost:5000/api/docs`. 📝

### 3️⃣ Frontend Setup
Open a new terminal window, navigate to the frontend directory:

```bash
cd frontent  # Note the exact directory name

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
> **Note:** The frontend application runs at `http://localhost:5173`. To connect to a remote backend, configure the `VITE_API_URL` environment variable.

---

## 📂 Project Structure

```text
Tripora/
├── backend/                  # NestJS Application API
│   ├── src/                  # Controllers, Modules, Services, Database Models
│   ├── dist/                 # Compiled backend production code
│   └── .env                  # Environment Variables (Keep Private!)
├── frontent/                 # React & Vite Application
│   ├── src/                  # React Components, Pages, and lib/api.js
│   ├── public/               # Static web assets
│   └── vite.config.js        # Vite configurations
└── README.md                 # Detailed Project documentation
```

---

## 🗺️ Application Workflow

Here is how the application flows from a user's perspective:

1. **Home (`/`)**: Main system entry. Filter and search destinations, manage past trip cards, and utilize quick links.
2. **Explore (`/explore`)**: Dive into beautiful travel spots. Select search items to kickstart your planning process.
3. **Authentication (`/login`, `/register`)**: Secure account generation featuring avatar uploads and error feedback.
4. **Trip Planning (`/create-trip`)**: Provide titles, define target destinations, lock in dates, and confirm starting activities.
5. **Itinerary Builder (`/build-itinerary`)**: Draft the day-by-day plan—organizing exact travel sections and timeline flow.
6. **Detailed View (`/itinerary-view`)**: Overview travel days in full depth, handle budget concerns, and adjust items on the fly.
7. **Trip Management (`/my-trips`)**: Assess specific trip statuses (Ongoing, Upcoming, Completed). Copy, edit, or delete trip configurations.
8. **User Profile (`/profile`)**: See your global travel stats, previous adventures, and upcoming expeditions.

---

## 🛡️ Security Note

> **⚠️ CRITICAL:** Ensure that your `backend/.env` file containing sensitive configurations (like `MONGO_URI` and `JWT_SECRET`) is exclusively available locally. It is managed by `.gitignore` and **must never** be pushed to GitHub or public source control!

---

## 🤝 Contributing

Contributions, constructive issues, and feature requests are immensely welcome! Please don't hesitate to check the [issues page](https://github.com/yourusername/Tripora/issues).

1. **Fork** the project.
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`).
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the branch (`git push origin feature/AmazingFeature`).
5. **Open** a Pull Request.

---

<div align="center">
  <b>Happy Travels & Happy Coding! 🛫👨‍💻</b>
</div>
