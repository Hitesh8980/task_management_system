import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Regsiter";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import TasksPage from "./pages/user/TaskPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import UsersPage from "./pages/admin/Userpage";
import LogsPage from "./pages/admin/Logspage";

function App() {

  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* USER DASHBOARD */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />


      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <TasksPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <ProtectedRoute adminOnly={true}>
      <UsersPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/logs"
  element={
    <ProtectedRoute adminOnly={true}>
      <LogsPage />
    </ProtectedRoute>
  }
/>

    </Routes>
    
  );
}

export default App;