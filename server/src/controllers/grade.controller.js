import Grade from '../models/grade.model.js';
import Student from '../models/student.model.js';
import Exam from '../models/exam.model.js';
import Course from '../models/course.model.js';

// Create a new grade
export const createGrade = async (req, res) => {
  try {
    const { studentId, examId, courseId, ...gradeData } = req.body;

    // Validate student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Validate exam exists
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    // Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const grade = new Grade({
      ...gradeData,
      student: studentId,
      exam: examId,
      course: courseId
    });

    await grade.save();

    await grade.populate(['student', 'exam', 'course']);

    res.status(201).json({
      success: true,
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all grades
export const getAllGrades = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const grades = await Grade.find()
      .populate(['student', 'exam', 'course'])
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Grade.countDocuments();

    res.status(200).json({
      success: true,
      data: grades,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get grade by ID
export const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id).populate(['student', 'exam', 'course']);
    
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    res.status(200).json({
      success: true,
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update grade
export const updateGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate(['student', 'exam', 'course']);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    res.status(200).json({
      success: true,
      data: grade
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete grade
export const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);

    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Grade deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get grades by student
export const getGradesByStudent = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.studentId })
      .populate(['student', 'exam', 'course'])
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: grades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get grades by exam
export const getGradesByExam = async (req, res) => {
  try {
    const grades = await Grade.find({ exam: req.params.examId })
      .populate(['student', 'exam', 'course'])
      .sort({ score: -1 });

    res.status(200).json({
      success: true,
      data: grades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get grades by course
export const getGradesByCourse = async (req, res) => {
  try {
    const grades = await Grade.find({ course: req.params.courseId })
      .populate(['student', 'exam', 'course'])
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: grades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 