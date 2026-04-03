# Task Master API

https://task-master-fullstac.onrender.com/

This is a RESTful API built with Node.js, Express, and MongoDB. It allows users to register, log in, and manage projects and tasks. Each user can create their own projects, and each project can contain multiple tasks. The API uses JSON Web Tokens (JWT) for authentication and ensures that users can only access and modify their own data.


### Users
- POST /api/users/register
- POST /api/users/login

### Projects
- POST /api/projects
- GET /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Tasks
- POST /api/projects/:projectId/tasks
- GET /api/projects/:projectId/tasks
- PUT /api/tasks/:taskId
- DELETE /api/tasks/:taskId

## Features
- User authentication (register & login)
- Password hashing using bcrypt
- JWT-based authorization
- Full CRUD for projects
- Full CRUD for tasks
- Nested routes for tasks under projects
- Ownership-based access control
- Data persistence with MongoDB
- Populated references for better API responses

## Tech Stack
- Node.js
- Express
- MongoDB & Mongoose
- bcrypt
- jsonwebtoken
- dotenv
