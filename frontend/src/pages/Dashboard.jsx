import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import CourseCard from '../components/CourseCard'
import api from '../services/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEnrolledCourses()
  }, [])

  const fetchEnrolledCourses = async () => {
    try {
      const response = await api.get('courses/enrolled/my-courses')
      setEnrolledCourses(response.data)
    } catch (error) {
      toast.error('Failed to fetch enrolled courses',error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">Here are your enrolled courses</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Total Courses</h3>
          <p className="text-3xl font-bold mt-2">{enrolledCourses.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-600">Account Type</h3>
          <p className="text-3xl font-bold mt-2 capitalize">{user?.role}</p>
        </div>
        
      </div>

      {/* Enrolled Courses */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
            <a
              href="/courses"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Browse Courses
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard