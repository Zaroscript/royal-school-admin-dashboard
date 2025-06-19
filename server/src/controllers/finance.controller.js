import Finance from '../models/finance.model.js';
import Student from '../models/student.model.js';

// Create a new finance record
export const createFinanceRecord = async (req, res) => {
  try {
    const { studentId, ...financeData } = req.body;

    // Validate student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const financeRecord = new Finance({
      ...financeData,
      student: studentId
    });

    await financeRecord.save();

    await financeRecord.populate('student');

    res.status(201).json({
      success: true,
      data: financeRecord
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all finance records
export const getAllFinanceRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc' } = req.query;

    const records = await Finance.find()
      .populate('student')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Finance.countDocuments();

    res.status(200).json({
      success: true,
      data: records,
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

// Get finance record by ID
export const getFinanceRecordById = async (req, res) => {
  try {
    const record = await Finance.findById(req.params.id).populate('student');
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Finance record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update finance record
export const updateFinanceRecord = async (req, res) => {
  try {
    const record = await Finance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('student');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Finance record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete finance record
export const deleteFinanceRecord = async (req, res) => {
  try {
    const record = await Finance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Finance record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Finance record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get finance records by student
export const getFinanceRecordsByStudent = async (req, res) => {
  try {
    const records = await Finance.find({ student: req.params.studentId })
      .populate('student')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get finance records by type
export const getFinanceRecordsByType = async (req, res) => {
  try {
    const records = await Finance.find({ type: req.params.type })
      .populate('student')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: records
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get finance summary
export const getFinanceSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const summary = await Finance.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalRecords = await Finance.countDocuments(query);
    const totalAmount = await Finance.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary,
        totalRecords,
        totalAmount: totalAmount[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 