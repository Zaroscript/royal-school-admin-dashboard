import Schedule from '../models/schedule.model.js';
import Teacher from '../models/teacher.model.js';
import Course from '../models/course.model.js';

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const { teacherId, courseId, ...scheduleData } = req.body;

    // Validate teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
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

    const schedule = new Schedule({
      ...scheduleData,
      teacher: teacherId,
      course: courseId
    });

    await schedule.save();

    await schedule.populate(['teacher', 'course']);

    res.status(201).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all schedules
export const getAllSchedules = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'day', sortOrder = 'asc' } = req.query;

    const schedules = await Schedule.find()
      .populate(['teacher', 'course'])
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Schedule.countDocuments();

    res.status(200).json({
      success: true,
      data: schedules,
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

// Get schedule by ID
export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate(['teacher', 'course']);
    
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update schedule
export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate(['teacher', 'course']);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    res.status(200).json({
      success: true,
      data: schedule
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete schedule
export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get schedules by teacher
export const getSchedulesByTeacher = async (req, res) => {
  try {
    const schedules = await Schedule.find({ teacher: req.params.teacherId })
      .populate(['teacher', 'course'])
      .sort({ day: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get schedules by class
export const getSchedulesByClass = async (req, res) => {
  try {
    const schedules = await Schedule.find({ class: req.params.classId })
      .populate(['teacher', 'course'])
      .sort({ day: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get schedules by day
export const getSchedulesByDay = async (req, res) => {
  try {
    const schedules = await Schedule.find({ day: req.params.day })
      .populate(['teacher', 'course'])
      .sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      data: schedules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 