import { useState, useEffect } from 'react'

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: '',
    price: '',
    duration: ''
  })

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || '',
        description: course.description || '',
        instructor: course.instructor || '',
        category: course.category || '',
        price: course.price || '',
        duration: course.duration || ''
      })
    }
  }, [course])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {course ? 'Edit Course' : 'Create New Course'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Instructor</label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., 8 weeks"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {course ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseForm