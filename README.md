# TaskMaster - Fullstack MERN App Capstone

### Deployment link
https://task-master-fullstack.netlify.app

TaskMaster is a full-stack project management application built using the MERN stack (MongoDB, Express, React, Node.js). Users can create projects, manage tasks within those projects, and track progress using different task statuses.

This project demonstrates authentication, protected routes, CRUD operations, and full frontend-backend integration.

---

## 🚀 Features

### 🔐 User Authentication
- Register a new account
- Login with secure JWT authentication
- Protected routes (only logged-in users can access data)
- Logout functionality

### 📁 Project Management
- Create new projects
- View all your projects in a dashboard
- View individual project details
- Update and delete projects (ownership enforced)

### ✅ Task Management
- Add tasks to a project
- View all tasks within a project
- Update task status (To Do, In Progress, Done)
- Delete tasks
- Authorization ensures only the project owner can manage tasks

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Context API (Authentication state)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

---

## 🔑 Key Concepts Implemented

- RESTful API design
- JWT authentication & authorization
- Protected routes (frontend + backend)
- Middleware for security
- MongoDB relationships (User → Project → Task)
- Axios interceptors for token handling
- Local storage for session persistence
- Responsive UI with modern CSS styling
