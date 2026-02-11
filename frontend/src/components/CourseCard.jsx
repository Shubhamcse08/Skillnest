import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'

const CourseCard = ({ course, isAdmin = false, onDelete, onUpdate }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll in courses')
      return
    }

    setLoading(true)
    try {
      await api.post(`/courses/${course._id}/enroll`)
      toast.success('Successfully enrolled in course!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed')
    } finally {
      setLoading(false)
    }
    console.log("COURSE OBJECT:", course);   // 👈 add this
  console.log("COURSE ID:", course._id); 
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${course._id}`)
        toast.success('Course deleted successfully')
        if (onDelete) onDelete(course._id)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Delete failed')
      }
    }
  }

  const isEnrolled = user?.enrolledCourses?.includes(course._id)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Instructor: {course.instructor}</span>
          <span className="text-sm font-semibold text-blue-600">${course.price}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{course.duration}</span>
          <span className="text-sm text-gray-500">{course.category}</span>
        </div>
        
        <div className="mt-6 flex space-x-2">
          {!isAdmin ? (
            <>
              <button
                onClick={handleEnroll}
                disabled={loading || isEnrolled}
                className={`flex-1 px-4 py-2 rounded ${
                  isEnrolled 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } disabled:opacity-50`}
              >
                {isEnrolled ? 'Enrolled' : loading ? 'Enrolling...' : 'Enroll'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onUpdate && onUpdate(course)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard