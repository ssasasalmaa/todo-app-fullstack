# Full-Stack Todo Application

A full-stack Todo application built with the MERN stack and a monorepo architecture. The application includes user authentication, todo management, input validation, logging, automated testing, cloud deployment, and CI/CD.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- Bcrypt
- Winston
- Morgan

### Testing

- Jest
- Playwright

### DevOps & Deployment

- PNPM Workspaces
- Turborepo
- GitHub Actions
- Vercel
- Railway
- MongoDB Atlas

## Features

### Authentication

- User registration and login
- Password hashing using Bcrypt
- JWT-based authentication
- Protected routes
- User-specific todo data

### Todo Management

- Create todo
- View todos
- Update todo
- Delete todo
- Todo status management

### Backend

- RESTful API using Express.js
- MongoDB database integration using Mongoose
- Request and application logging
- Input validation
- Centralized error handling
- Health check endpoint
- Environment-based configuration

### Testing

- Unit testing with Jest
- API and middleware testing
- Integration testing
- End-to-end testing with Playwright

### CI/CD

The project uses GitHub Actions to automate the development workflow.

Push to GitHub
      |
      v
Install Dependencies
      |
      v
Run Tests
      |
      v
Build
      |
      v
Deploy


## Architecture

The application follows a monorepo structure with separate frontend and backend applications.

```text
todo-app-fullstack/
├── apps/
│   ├── frontend/
│   └── backend/
│
├── packages/
│
├── .github/
│   └── workflows/
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

### Application Flow

[ React Frontend ]
       |
       | REST API
       | Axios
       v
[ Express Backend ]
       |
       | Mongoose
       v
[ MongoDB Atlas ]


The frontend handles the user interface and client-side routing, while the backend provides the REST API, authentication, validation, and database operations.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Todos

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get user's todos |
| POST | `/api/todos` | Create a todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check API status |
| GET | `/health-checks` | Check application and service status |

## Environment Variables

### Backend

Create a `.env` file inside `apps/backend`.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

Create a `.env` file inside `apps/frontend`.

```env
VITE_API_URL=your_backend_url
```

Do not commit environment files or sensitive credentials to the repository.

## Running Locally

### Prerequisites

- Node.js 22 LTS or later
- PNPM
- MongoDB Atlas account

### Installation

Clone the repository:

```bash
git clone https://github.com/ssasasalmaa/todo-app-fullstack.git
cd todo-app-fullstack
```

Install dependencies:

```bash
pnpm install
```

Set up the required environment variables in the frontend and backend `.env` files.

Run the development environment:

```bash
pnpm dev
```

## Deployment

The application is deployed using separate frontend and backend services.

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Railway |
| Database | MongoDB Atlas |
| CI/CD | GitHub Actions |

## Project Structure

```text
todo-app-fullstack/
│
├── apps/
│   ├── frontend/
│   │   ├── src/
│   │   └── ...
│   │
│   └── backend/
│       ├── config/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── server.js
│
├── packages/
│
├── .github/
│   └── workflows/
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Live Demo

Frontend: https://todo-app-fullstack-git-main-sachen.vercel.app/

Backend: todo-app-fullstack-production-f09e.up.railway.app

## Screenshots

### Login

<img width="1020" height="768" alt="image" src="https://github.com/user-attachments/assets/6b8f0a0d-a3f3-4915-aeca-f2a8fd20f955" />


### Todo Dashboard

<img width="1296" height="797" alt="image" src="https://github.com/user-attachments/assets/774d7f58-6826-4a00-8a32-dd9109ca4ad2" />


### GitHub Actions

<img width="1877" height="666" alt="image" src="https://github.com/user-attachments/assets/5aceec6a-6b8a-4c08-87a6-516e85f768d0" />

## Author

**Salsabila Salma**

GitHub: https://github.com/ssasasalmaa
