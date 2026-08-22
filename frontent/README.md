# GlobeTrotter 🌍

**Empowering Personalized Travel Planning**

A modern, full-stack multi-city travel planning application that helps users dream, design, and organize trips with ease. Built as a comprehensive solution for creating customized itineraries, managing budgets, discovering activities, and sharing travel plans.

---

## ✨ Overview

GlobeTrotter transforms the way people plan travel. Users can create multi-city trips, add stops and activities, get automatic budget estimates, visualize their journey through calendars and timelines, and share their plans with friends or publicly.

The application focuses on:
- Intuitive multi-city itinerary building
- Real-time budget tracking and cost breakdowns
- Beautiful visual planning tools
- Seamless sharing experience
- Clean relational database design

---

## 🚀 Features

### Core Features
- **Authentication** – Secure Login / Signup with email & password
- **Dashboard** – Welcome hub with upcoming trips, recommended destinations, and budget highlights
- **Create Trip** – Simple form to start a new adventure (name, dates, description, cover photo)
- **My Trips** – List view of all user trips with quick actions
- **Itinerary Builder** – Add cities (stops), assign dates, and attach activities
- **City Search** – Discover destinations with filters (country, cost index, popularity)
- **Activity Search** – Browse experiences by type, cost, and duration
- **Itinerary View** – Structured day-wise or city-grouped plan
- **Budget & Cost Breakdown** – Automatic calculations with charts and over-budget alerts
- **Calendar / Timeline View** – Visual journey overview with drag-and-drop support
- **Public Sharing** – Shareable read-only itinerary links + “Copy Trip” feature
- **User Profile & Settings** – Manage personal info, preferences, and account

### Optional / Stretch
- Admin Analytics Dashboard
- Social media sharing buttons
- Saved destinations
- Dark mode

---

## 🛠️ Tech Stack

### Languages
- **TypeScript** – Primary language (type-safe frontend & backend)
- **SQL** – Database queries and schema

### Frontend
- **React** / **Next.js 14+** (App Router)
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – High-quality accessible components
- **Framer Motion** – Smooth animations
- **React Hook Form + Zod** – Form handling & validation
- **Lucide React** – Beautiful icons
- **Recharts** – Budget charts and visualizations

### Backend & Database
- **Node.js** + **Express** or **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL** – Relational database

### Authentication
- JWT + bcrypt  
  *(or Clerk / NextAuth.js)*

### Other Tools
- **Cloudinary** (or local storage) – Cover photo uploads
- **date-fns** / **react-day-picker** – Date handling
- **Vercel** + **Railway / Render** – Deployment

---

## 📁 Suggested Project Structure
