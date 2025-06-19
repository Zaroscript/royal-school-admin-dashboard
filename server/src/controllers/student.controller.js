import Student from '../models/student.model.js';
import Attendance from '../models/attendance.model.js';
import Grade from '../models/grade.model.js';
import Course from '../models/course.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Moderator
export const getAllStudents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const grade = req.query.grade || '';
  const status = req.query.status || '';
  const gender = req.query.gender || '';

  const query = {};

  // Search by name, studentId, or email
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { studentId: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by grade
  if (grade) {
    query.grade = grade;
  }

  // Filter by status
  if (status !== '') {
    query.status = status;
  }

  // Filter by gender
  if (gender) {
    query.gender = gender;
  }

  const skip = (page - 1) * limit;

  const students = await Student.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(query);

  res.status(200).json({
    success: true,
    data: students,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private/Moderator
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    // .populate('parent', 'name phone email')
    // .populate('courses', 'name code'); // Remove or fix if 'courses' is not a ref

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// @desc    Create new student
// @route   POST /api/students
// @access  Private/Moderator
export const createStudent = asyncHandler(async (req, res) => {
  const {
    name,
    studentId,
    email,
    phone,
    birthDate,
    gender,
    address,
    grade,
    section,
    parentName,
    parentPhone,
    parentEmail,
    emergencyContact,
    medicalNotes,
    photo
  } = req.body;

  // Check if student with same studentId or email exists
  const existingStudent = await Student.findOne({
    $or: [{ studentId }, { email }]
  });

  if (existingStudent) {
    return res.status(400).json({
      success: false,
      message: 'الطالب مسجل مسبقاً بنفس الرقم أو البريد الإلكتروني'
    });
  }

  const student = await Student.create({
    name,
    studentId,
    email,
    phone,
    birthDate,
    gender,
    address,
    grade,
    section,
    parentName,
    parentPhone,
    parentEmail,
    emergencyContact,
    medicalNotes,
    photo
  });

  res.status(201).json({
    success: true,
    message: 'تم إضافة الطالب بنجاح',
    data: student
  });
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Moderator
export const updateStudent = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    birthDate,
    gender,
    address,
    grade,
    section,
    parentName,
    parentPhone,
    parentEmail,
    emergencyContact,
    medicalNotes,
    photo,
    status
  } = req.body;

  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  // Check if email is being changed and if it's already taken
  if (email && email !== student.email) {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مسجل مسبقاً'
      });
    }
  }

  // Update fields
  if (name) student.name = name;
  if (email) student.email = email;
  if (phone) student.phone = phone;
  if (birthDate) student.birthDate = birthDate;
  if (gender) student.gender = gender;
  if (address) student.address = address;
  if (grade) student.grade = grade;
  if (section) student.section = section;
  if (parentName) student.parentName = parentName;
  if (parentPhone) student.parentPhone = parentPhone;
  if (parentEmail) student.parentEmail = parentEmail;
  if (emergencyContact) student.emergencyContact = emergencyContact;
  if (medicalNotes) student.medicalNotes = medicalNotes;
  if (photo) student.photo = photo;
  if (status) student.status = status;

  const updatedStudent = await student.save();

  res.status(200).json({
    success: true,
    message: 'تم تحديث بيانات الطالب بنجاح',
    data: updatedStudent
  });
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Moderator
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  // Check if student has related data
  const hasAttendance = await Attendance.exists({ student: req.params.id });
  const hasGrades = await Grade.exists({ student: req.params.id });

  if (hasAttendance || hasGrades) {
    return res.status(400).json({
      success: false,
      message: 'لا يمكن حذف الطالب لوجود بيانات مرتبطة به'
    });
  }

  await Student.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'تم حذف الطالب بنجاح'
  });
});

// @desc    Get student profile with statistics
// @route   GET /api/students/:id/profile
// @access  Private/Moderator
export const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    // .populate('parent', 'name phone email')
    .populate('courses', 'name code');

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  // Get attendance statistics
  const attendanceStats = await Attendance.aggregate([
    { $match: { student: student._id } },
    {
      $group: {
        _id: null,
        totalDays: { $sum: 1 },
        presentDays: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
        absentDays: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
        lateDays: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } }
      }
    }
  ]);

  // Get grade statistics
  const gradeStats = await Grade.aggregate([
    { $match: { student: student._id } },
    {
      $group: {
        _id: null,
        averageGrade: { $avg: '$grade' },
        totalExams: { $sum: 1 },
        highestGrade: { $max: '$grade' },
        lowestGrade: { $min: '$grade' }
      }
    }
  ]);

  const profile = {
    student,
    statistics: {
      attendance: attendanceStats[0] || { totalDays: 0, presentDays: 0, absentDays: 0, lateDays: 0 },
      grades: gradeStats[0] || { averageGrade: 0, totalExams: 0, highestGrade: 0, lowestGrade: 0 }
    }
  };

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Get student attendance
// @route   GET /api/students/:id/attendance
// @access  Private/Moderator
export const getStudentAttendance = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  const query = { student: req.params.id };

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const skip = (page - 1) * limit;

  const attendance = await Attendance.find(query)
    .populate('course', 'name code')
    .sort({ date: -1 })
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

// @desc    Get student grades
// @route   GET /api/students/:id/grades
// @access  Private/Moderator
export const getStudentGrades = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const course = req.query.course;

  const query = { student: req.params.id };

  if (course) {
    query.course = course;
  }

  const skip = (page - 1) * limit;

  const grades = await Grade.find(query)
    .populate('course', 'name code')
    .populate('exam', 'title date')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Grade.countDocuments(query);

  res.status(200).json({
    success: true,
    data: grades,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get student courses
// @route   GET /api/students/:id/courses
// @access  Private/Moderator
export const getStudentCourses = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate('courses', 'name code description teacher');

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  res.status(200).json({
    success: true,
    data: student.courses
  });
});

// @desc    Upload student photo
// @route   POST /api/students/:id/photo
// @access  Private/Moderator
export const uploadStudentPhoto = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'يرجى اختيار صورة'
    });
  }

  // Update student photo
  student.photo = `/uploads/students/${req.file.filename}`;
  await student.save();

  res.status(200).json({
    success: true,
    message: 'تم رفع الصورة بنجاح',
    data: {
      photo: student.photo
    }
  });
});

// @desc    Force delete student and all related data
// @route   DELETE /api/students/:id/force
// @access  Private/Admin
export const forceDeleteStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'الطالب غير موجود'
    });
  }
  // Delete all grades
  await Grade.deleteMany({ student: studentId });
  // Delete all attendance records
  await Attendance.deleteMany({ student: studentId });
  // Delete the student
  await Student.findByIdAndDelete(studentId);
  res.status(200).json({
    success: true,
    message: 'تم حذف الطالب وجميع البيانات المرتبطة به بنجاح.'
  });
}); 