Enterprise Task Management System

A full-stack MERN application with JWT authentication, Role-Based Access Control (RBAC), Admin Dashboard, Activity Logging, Analytics, and responsive enterprise UI.

# Demo Credentials

## Admin Access

Email:
admin@gmail.com

Password:
123456

## Live Demo
## Frontend
    
     https://task-management-system-nine-kappa.vercel.app/login

## Backend API

     https://task-management-system-942c.onrender.com

## Features
- Authentication & Authorization
- JWT Authentication
- Password hashing using bcrypt
- Protected Routes
- Role-Based Access Control (RBAC)
- Admin & User roles

## User Features
- Register & Login
- Create Tasks
- Update Tasks
- Delete Tasks
- View Personal Tasks
- Search Tasks
- Task Analytics

##  Admin Features
- View All Users
- Delete Users
- Manage User Status
- View All Tasks
- Monitor User Activities
- Access Activity Logs

## Activity Logging

# Tracks:

- User Login
- Task Creation
- Task Updates
- Task Deletion

## Analytics Dashboard

# Displays:

- Total Users
- Total Tasks
- Completed Tasks
- Pending Tasks
- Pie Chart Analytics

## Tech Stack
- Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Recharts
- React Icons
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

##  Installation Guide
1. Clone Repository
      ```bash
         git clone https://github.com/your-username/task_management_system.git

2.  Navigate to Project
         cd task_management_system
## Backend Setup

# Navigate to Backend   
         cd backend
# Install Dependencies   
         npm install
 # Create .env File   
         PORT=8000
         MONGO_URI=your_mongodb_connection_string
         JWT_SECRET=your_secret_key
 ## Start Backend Server    
          npm run dev
 ## Frontend Setup
# Navigate to Frontend   
         cd frontend
 # Install Dependencies   
         npm install
 # Create .env File 
         VITE_API_URL=http://localhost:8000/api
# Start frontend Server    
          npm run dev

## API Endpoints
# Authentication APIs
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
## Task APIs
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/tasks` | Get User Tasks |
| POST | `/api/tasks` | Create Task |
| PUT | `/api/tasks/:id` | Update Task |
| DELETE | `/api/tasks/:id` | Delete Task |

## Admin APIs
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/admin/users` | Get All Users |
| DELETE | `/api/admin/users/:id` | Delete User |
| PATCH | `/api/admin/users/:id/status` | Update User Status |
| GET | `/api/admin/tasks` | Get All Tasks |
| DELETE | `/api/admin/tasks/:id` | Delete Any Task |
| GET | `/api/admin/logs` | Get Activity Logs |


         
         

