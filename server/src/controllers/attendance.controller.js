import Attendance from '../models/attendance.model.js';
import Student from '../models/student.model.js';
import Course from '../models/course.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private/Moderator
export const getAllAttendance = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const date = req.query.date;
  const student = req.query.student;
  const course = req.query.course;
  const status = req.query.status;

  const query = {};

  // Filter by date
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    query.date = {
      $gte: startDate,
      $lt: endDate
    };
  }

  // Filter by student
  if (student) {
    query.student = student;
  }

  // Filter by course
  if (course) {
    query.course = course;
  }

  // Filter by status
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const attendance = await Attendance.find(query)
    .populate('student', 'name studentId')
    .populate('course', 'name code')
    .sort({ date: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Attendance.countDocuments(query);

  res.status(200).json({
    success: true,
    data: attendance,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get attendance by ID
// @route   GET /api/attendance/:id
// @access  Private/Moderator
export const getAttendanceById = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id)
    .populate('student', 'name studentId email')
    .populate('course', 'name code');

  if (!attendance) {
    return res.status(404).json({
      success: false,
      message: 'سجل الحضور غير موجود'
    });
  }

  res.status(200).json({
    success: true,
    data: attendance
  });
});

// @desc    Create new attendance record
// @route   POST /api/attendance
// @access  Private/Moderator
export const createAttendance = asyncHandler(async (req, res) => {
  const {
    student,
    course,
    date,
    status,
    notes
  } = req.body;

  // Check if student exists
  const studentExists = await Student.findById(student);
  if (!studentExists) {
    return res.status(400).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  // Check if course exists
  const courseExists = await Course.findById(course);
  if (!courseExists) {
    return res.status(400).json({
      success: false,
      message: 'المادة غير موجودة'
    });
  }

  // Check if attendance record already exists for this student, course, and date
  const existingAttendance = await Attendance.findOne({
    student,
    course,
    date: new Date(date)
  });

  if (existingAttendance) {
    return res.status(400).json({
      success: false,
      message: 'سجل الحضور موجود مسبقاً لهذا الطالب والمادة والتاريخ'
    });
  }

  const attendance = await Attendance.create({
    student,
    course,
    date: new Date(date),
    status,
    notes
  });

  res.status(201).json({
    success: true,
    message: 'تم إضافة سجل الحضور بنجاح',
    data: attendance
  });
});

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private/Moderator
export const updateAttendance = asyncHandler(async (req, res) => {
  const {
    status,
    notes
  } = req.body;

  const attendance = await Attendance.findById(req.params.id);
  if (!attendance) {
    return res.status(404).json({
      success: false,
      message: 'سجل الحضور غير موجود'
    });
  }

  // Update fields
  if (status) attendance.status = status;
  if (notes !== undefined) attendance.notes = notes;

  const updatedAttendance = await attendance.save();

  res.status(200).json({
    success: true,
    message: 'تم تحديث سجل الحضور بنجاح',
    data: updatedAttendance
  });
});

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private/Moderator
export const deleteAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id);
  
  if (!attendance) {
    return res.status(404).json({
      success: false,
      message: 'سجل الحضور غير موجود'
    });
  }

  await Attendance.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'تم حذف سجل الحضور بنجاح'
  });
});

// @desc    Get attendance by date
// @route   GET /api/attendance/date/:date
// @access  Private/Moderator
export const getAttendanceByDate = asyncHandler(async (req, res) => {
  const { date } = req.params;
  const { course } = req.query;

  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  const query = {
    date: {
      $gte: startDate,
      $lt: endDate
    }
  };

  if (course) {
    query.course = course;
  }

  const attendance = await Attendance.find(query)
    .populate('student', 'name studentId')
    .populate('course', 'name code')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: attendance
  });
});

// @desc    Get attendance by student
// @route   GET /api/attendance/student/:studentId
// @access  Private/Moderator
export const getAttendanceByStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { startDate, endDate, course } = req.query;

  const query = { student: studentId };

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  if (course) {
    query.course = course;
  }

  const attendance = await Attendance.find(query)
    .populate('course', 'name code')
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    data: attendance
  });
});

// @desc    Get attendance by course
// @route   GET /api/attendance/course/:courseId
// @access  Private/Moderator
export const getAttendanceByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { date } = req.query;

  const query = { course: courseId };

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    query.date = {
      $gte: startDate,
      $lt: endDate
    };
  }

  const attendance = await Attendance.find(query)
    .populate('student', 'name studentId')
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    data: attendance
  });
}); 