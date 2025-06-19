import Teacher from '../models/teacher.model.js';
import Course from '../models/course.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Moderator
export const getAllTeachers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  const department = req.query.department || '';
  const status = req.query.status || '';

  const query = {};

  // Search by name, teacherId, or email
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { teacherId: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  // Filter by department
  if (department) {
    query.department = department;
  }

  // Filter by status
  if (status !== '') {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const teachers = await Teacher.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Teacher.countDocuments(query);

  res.status(200).json({
    success: true,
    data: teachers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get teacher by ID
// @route   GET /api/teachers/:id
// @access  Private/Moderator
export const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'المعلم غير موجود'
    });
  }

  res.status(200).json({
    success: true,
    data: teacher
  });
});

// @desc    Create new teacher
// @route   POST /api/teachers
// @access  Private/Moderator
export const createTeacher = asyncHandler(async (req, res) => {
  const {
    name,
    teacherId,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    department,
    position,
    qualification,
    experience,
    salary,
    hireDate,
    photo
  } = req.body;

  // Check if teacher with same teacherId or email exists
  const existingTeacher = await Teacher.findOne({
    $or: [{ teacherId }, { email }]
  });

  if (existingTeacher) {
    return res.status(400).json({
      success: false,
      message: 'المعلم مسجل مسبقاً بنفس الرقم أو البريد الإلكتروني'
    });
  }

  const teacher = await Teacher.create({
    name,
    teacherId,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    department,
    position,
    qualification,
    experience,
    salary,
    hireDate,
    photo
  });

  res.status(201).json({
    success: true,
    message: 'تم إضافة المعلم بنجاح',
    data: teacher
  });
});

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Private/Moderator
export const updateTeacher = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    dateOfBirth,
    gender,
    address,
    department,
    position,
    qualification,
    experience,
    salary,
    hireDate,
    photo,
    status
  } = req.body;

  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'المعلم غير موجود'
    });
  }

  // Check if email is being changed and if it's already taken
  if (email && email !== teacher.email) {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مسجل مسبقاً'
      });
    }
  }

  // Update fields
  if (name) teacher.name = name;
  if (email) teacher.email = email;
  if (phone) teacher.phone = phone;
  if (dateOfBirth) teacher.dateOfBirth = dateOfBirth;
  if (gender) teacher.gender = gender;
  if (address) teacher.address = address;
  if (department) teacher.department = department;
  if (position) teacher.position = position;
  if (qualification) teacher.qualification = qualification;
  if (experience) teacher.experience = experience;
  if (salary) teacher.salary = salary;
  if (hireDate) teacher.hireDate = hireDate;
  if (photo) teacher.photo = photo;
  if (status) teacher.status = status;

  const updatedTeacher = await teacher.save();

  res.status(200).json({
    success: true,
    message: 'تم تحديث بيانات المعلم بنجاح',
    data: updatedTeacher
  });
});

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
// @access  Private/Moderator
export const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  
  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'المعلم غير موجود'
    });
  }

  // Check if teacher has related courses
  const hasCourses = await Course.exists({ teacher: req.params.id });

  if (hasCourses) {
    return res.status(400).json({
      success: false,
      message: 'لا يمكن حذف المعلم لوجود دورات مرتبطة به'
    });
  }

  await Teacher.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'تم حذف المعلم بنجاح'
  });
});

// @desc    Get teacher profile with statistics
// @route   GET /api/teachers/:id/profile
// @access  Private/Moderator
export const getTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'المعلم غير موجود'
    });
  }

  // Get course statistics
  const courseStats = await Course.aggregate([
    { $match: { teacher: teacher._id } },
    {
      $group: {
        _id: null,
        totalCourses: { $sum: 1 },
        totalStudents: { $sum: { $size: '$students' } }
      }
    }
  ]);

  const profile = {
    teacher,
    statistics: {
      courses: courseStats[0] || { totalCourses: 0, totalStudents: 0 }
    }
  };

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Get teacher courses
// @route   GET /api/teachers/:id/courses
// @access  Private/Moderator
export const getTeacherCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ teacher: req.params.id })
    .populate('students', 'name studentId');

  res.status(200).json({
    success: true,
    data: courses
  });
});

// @desc    Upload teacher photo
// @route   POST /api/teachers/:id/photo
// @access  Private/Moderator
export const uploadTeacherPhoto = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  
  if (!teacher) {
    return res.status(404).json({
      success: false,
      message: 'المعلم غير موجود'
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'يرجى اختيار صورة'
    });
  }

  // Update teacher photo
  teacher.photo = `/uploads/teachers/${req.file.filename}`;
  await teacher.save();

  res.status(200).json({
    success: true,
    message: 'تم رفع الصورة بنجاح',
    data: {
      photo: teacher.photo
    }
  });
}); 