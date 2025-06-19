import Course from '../models/course.model.js';
import Teacher from '../models/teacher.model.js';
import Student from '../models/student.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private/Moderator
export const getAllCourses = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const teacher = req.query.teacher || '';
  const grade = req.query.grade || '';

  const query = {};

  // Search by name or code
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by teacher
  if (teacher) {
    query.teacher = teacher;
  }

  // Filter by grade
  if (grade) {
    query.grade = grade;
  }

  const skip = (page - 1) * limit;

  const courses = await Course.find(query)
    .populate('teacher', 'name teacherId')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments(query);

  res.status(200).json({
    success: true,
    data: courses,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Private/Moderator
export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('teacher', 'name teacherId email phone');

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'المادة غير موجودة'
    });
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Moderator
export const createCourse = asyncHandler(async (req, res) => {
  const {
    name,
    code,
    description,
    teacher,
    grade,
    credits,
    maxStudents,
    schedule,
    classroom
  } = req.body;

  // Check if course with same code exists
  const existingCourse = await Course.findOne({ code });
  if (existingCourse) {
    return res.status(400).json({
      success: false,
      message: 'المادة مسجلة مسبقاً بنفس الكود'
    });
  }

  // Check if teacher exists
  const teacherExists = await Teacher.findById(teacher);
  if (!teacherExists) {
    return res.status(400).json({
      success: false,
      message: 'المعلم غير موجود'
    });
  }

  const course = await Course.create({
    name,
    code,
    description,
    teacher,
    grade,
    credits,
    maxStudents,
    schedule,
    classroom
  });

  res.status(201).json({
    success: true,
    message: 'تم إضافة المادة بنجاح',
    data: course
  });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Moderator
export const updateCourse = asyncHandler(async (req, res) => {
  const {
    name,
    code,
    description,
    teacher,
    grade,
    credits,
    maxStudents,
    schedule,
    classroom
  } = req.body;

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'المادة غير موجودة'
    });
  }

  // Check if code is being changed and if it's already taken
  if (code && code !== course.code) {
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'كود المادة مسجل مسبقاً'
      });
    }
  }

  // Check if teacher exists
  if (teacher) {
    const teacherExists = await Teacher.findById(teacher);
    if (!teacherExists) {
      return res.status(400).json({
        success: false,
        message: 'المعلم غير موجود'
      });
    }
  }

  // Update fields
  if (name) course.name = name;
  if (code) course.code = code;
  if (description) course.description = description;
  if (teacher) course.teacher = teacher;
  if (grade) course.grade = grade;
  if (credits) course.credits = credits;
  if (maxStudents) course.maxStudents = maxStudents;
  if (schedule) course.schedule = schedule;
  if (classroom) course.classroom = classroom;

  const updatedCourse = await course.save();

  res.status(200).json({
    success: true,
    message: 'تم تحديث بيانات المادة بنجاح',
    data: updatedCourse
  });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Moderator
export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'المادة غير موجودة'
    });
  }

  // Check if course has students enrolled
  if (course.students && course.students.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'لا يمكن حذف المادة لوجود طلاب مسجلين فيها'
    });
  }

  await Course.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'تم حذف المادة بنجاح'
  });
});

// @desc    Get course students
// @route   GET /api/courses/:id/students
// @access  Private/Moderator
export const getCourseStudents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate('students', 'name studentId email grade');

  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'المادة غير موجودة'
    });
  }

  res.status(200).json({
    success: true,
    data: course.students
  });
});

// @desc    Add student to course
// @route   POST /api/courses/:id/students
// @access  Private/Moderator
export const addStudentToCourse = asyncHandler(async (req, res) => {
  const { studentId } = req.body;

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'المادة غير موجودة'
    });
  }

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  // Check if student is already enrolled
  if (course.students.includes(studentId)) {
    return res.status(400).json({
      success: false,
      message: 'الطالب مسجل مسبقاً في هذه المادة'
    });
  }

  // Check if course is full
  if (course.maxStudents && course.students.length >= course.maxStudents) {
    return res.status(400).json({
      success: false,
      message: 'المادة ممتلئة'
    });
  }

  course.students.push(studentId);
  await course.save();

  res.status(200).json({
    success: true,
    message: 'تم إضافة الطالب إلى المادة بنجاح'
  });
});

// @desc    Remove student from course
// @route   DELETE /api/courses/:id/students/:studentId
// @access  Private/Moderator
export const removeStudentFromCourse = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'المادة غير موجودة'
    });
  }

  // Check if student is enrolled
  if (!course.students.includes(studentId)) {
    return res.status(400).json({
      success: false,
      message: 'الطالب غير مسجل في هذه المادة'
    });
  }

  course.students = course.students.filter(id => id.toString() !== studentId);
  await course.save();

  res.status(200).json({
    success: true,
    message: 'تم إزالة الطالب من المادة بنجاح'
  });
}); 