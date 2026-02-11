import { useState, useEffect } from 'react'
import CourseCard from '../components/CourseCard'
import CourseForm from '../components/CourseForm'
import api from '../services/api'
import toast from 'react-hot-toast'

const AdminCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)

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

  const handleCreate = async (courseData) => {
    try {
      const response = await api.post('/courses', courseData)
      setCourses([...courses, response.data.course])
      setShowForm(false)
      toast.success('Course created successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course')
    }
  }

  const handleUpdate = async (courseData) => {
    try {
      const response = await api.put(`/courses/${editingCourse._id}`, courseData)
      setCourses(courses.map(c => 
        c._id === editingCourse._id ? response.data.course : c
      ))
      setEditingCourse(null)
      toast.success('Course updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update course')
    }
  }

  const handleDelete = (courseId) => {
    setCourses(courses.filter(c => c._id !== courseId))
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add New Course
        </button>
      </div>

      {/* Course Form */}
      {(showForm || editingCourse) && (
        <div className="mb-8">
          <CourseForm
            course={editingCourse}
            onSubmit={editingCourse ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false)
              setEditingCourse(null)
            }}
          />
        </div>
      )}

      {/* Courses List */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              isAdmin={true}
              onDelete={handleDelete}
              onUpdate={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-xl text-gray-600">No courses found</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create First Course
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminCourses