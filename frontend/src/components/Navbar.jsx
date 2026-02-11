import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            to={isAdmin ? "/admin/courses" : user ? "/dashboard" : "/"} 
            className="text-xl font-bold text-blue-600"
          >
            SkillNest
          </Link>

          <div className="flex items-center space-x-4">

            {/* If NOT logged in */}
            {!user && (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              </>
            )}

            {/* If normal USER */}
            {user && !isAdmin && (
              <>
                <Link to="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
                <span className="text-gray-700">Hi, {user.name}</span>
              </>
            )}

            {/* If ADMIN */}
            {user && isAdmin && (
              <>
                <Link to="/admin/courses" className="text-gray-700 hover:text-blue-600">Manage Courses</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
                <span className="text-gray-700">Admin: {user.name}</span>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
