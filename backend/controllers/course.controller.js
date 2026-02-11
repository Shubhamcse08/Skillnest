import Course from '../models/Course.js';
import User from '../models/User.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const user = await User.findById(userId);
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add course to user's enrolled courses
    user.enrolledCourses.push(courseId);
    await user.save();

    // Add user to course's enrolled students
    course.enrolledStudents.push(userId);
    await course.save();

    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('enrolledCourses');
    
    res.json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};