# EDIR Management System

A modern community management system for **Edir** organizations built using **Spring Boot**, **React**, **PostgreSQL**, and **Docker**.

The application follows **Domain-Driven Design (DDD)**, **Hexagonal Architecture (Ports & Adapters)**, and **Spring Modulith** to provide a clean, maintainable, and scalable architecture.

---

# Features

## Edir Management

- Create and configure the Edir organization
- Update organization information
- View organization details
- Single Edir per deployment

## Member Management

- Register new members
- Update member information
- Deactivate members
- Search and filter members
- View member details

## Future Features

- Membership contributions
- Attendance management
- Funeral event management
- Financial management
- Notifications
- Reports and analytics
- User management
- Audit logs

---

# Technology Stack

## Backend

- Java 21
- Spring Boot
- Spring Modulith
- Spring Data JPA
- Hibernate
- PostgreSQL
- Liquibase
- Maven
- Docker

## Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- shadcn/ui
- Tailwind CSS

## Infrastructure

- Docker
- Docker Compose
- PostgreSQL

---

# Project Structure

```
edir-management-system
│
├── app
│   ├── src
|   ├── docker-compose.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── ui
│   ├── src
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
│
└── README.md
```

---

# Architecture

The backend follows:

- Domain Driven Design (DDD)
- Hexagonal Architecture
- Spring Modulith

```
                REST Controller
                      │
              Application Layer
                      │
          Domain (Aggregate Root)
          Domain Services
          Domain Events
                      │
              Output Ports
                      │
         Persistence Adapters
                      │
                PostgreSQL
```

---

# Prerequisites

Install the following before running the project.

- Docker
- Docker Compose

Optional for local development

- Java 21
- Maven 3.9+
- Node.js 22+
- npm

---

# Environment Variables

Create a `.env` file in the project root.

```env
POSTGRES_DB=edir_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123

SPRING_DATASOURCE_URL=jdbc:postgresql://database:5432/edir_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

VITE_API_URL=http://localhost:8080/api
```

---

# Running the Application

Start the entire application using Docker Compose.

```bash
docker compose up --build
```

Run in detached mode

```bash
docker compose up -d --build
```

Stop containers

```bash
docker compose down
```

Remove containers, network and volumes

```bash
docker compose down -v
```

---

# Application URLs

| Service | URL |
|----------|-----|
| UI | http://localhost |
| Backend API | http://localhost:8080 |
| PostgreSQL | localhost:5432 |

---

# Docker Services

The project contains three services.

| Service | Description |
|----------|-------------|
| database | PostgreSQL Database |
| backend | Spring Boot REST API |
| ui | React Frontend |

---

# Docker Compose Example

```
database
    │
    ├──────────────► app
    │                     │
    │                     │ REST API
    │                     ▼
    └──────────────► ui
```

---

# Development

## Backend

Navigate to the backend directory.

```bash
cd app
```

Run

```bash
./mvnw spring-boot:run
```

Run tests

```bash
./mvnw test
```

Package

```bash
./mvnw clean package
```

---

## Frontend

Navigate to the UI project.

```bash
cd ui
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production assets

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# Database

The application uses PostgreSQL running inside Docker.

Default credentials

| Property | Value |
|----------|-------|
| Database | edir_db |
| Username | admin |
| Password | Admin123 |
| Port | 5432 |

Database data is persisted using a Docker volume.

---

# API Documentation

Once the backend is running:

Swagger UI

```
http://localhost:8080/swagger-ui.html
```

OpenAPI

```
http://localhost:8080/v3/api-docs
```

---

# Testing

Backend

```bash
./mvnw test
```

Frontend

```bash
npm test
```

---

# Building Docker Images

Backend

```bash
docker build -t edir-backend ./app
```

Frontend

```bash
docker build -t edir-ui ./ui
```

---

# Deployment

Deploy the application using Docker Compose.

```bash
docker compose up -d --build
```

The deployment includes:

- PostgreSQL Database
- Spring Boot Backend
- React Frontend

---

# Recommended Production Setup

```
                    Internet
                        │
                 Reverse Proxy
                  (Nginx/Traefik)
                   │          │
                   │          │
              React UI    Spring Boot
                   │          │
                   └──────┬───┘
                          │
                    PostgreSQL
```

---

# Useful Docker Commands

View running containers

```bash
docker ps
```

View logs

```bash
docker compose logs -f
```

Restart services

```bash
docker compose restart
```

Rebuild images

```bash
docker compose build --no-cache
```

Remove unused Docker resources

```bash
docker system prune
```

---

# Code Style

Backend

- Domain-Driven Design
- Hexagonal Architecture
- Spring Modulith
- Constructor Injection
- Immutable Value Objects
- Aggregate Roots

Frontend

- Feature-based folder structure
- Functional Components
- React Hooks
- TypeScript
- TanStack Query
- shadcn/ui components

---

# Contributing

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

# License

This project is licensed under the MIT License.

---

# Authors
  * Abdi Asres
  * Abenezer
  * Dawit Bedecho
  * Abreham
  * Solomon Abbay

Developed with ❤️ using Spring Boot, React, PostgreSQL, and Docker.
