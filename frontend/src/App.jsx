import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import AdminCourses from './pages/AdminCourses'


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toaster position="top-right" />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/courses" element={
              <AdminRoute>
                <AdminCourses />
              </AdminRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App