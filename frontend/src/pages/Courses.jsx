import { useState, useEffect } from 'react'
import CourseCard from '../components/CourseCard'
import api from '../services/api'
import toast from 'react-hot-toast'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses/all')
      setCourses(response.data)
    } catch (error) {
      toast.error('Failed to fetch courses')
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
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No courses found</p>
        </div>
      )}
    </div>
  )
}

export default Courses
