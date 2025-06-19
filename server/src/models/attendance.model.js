import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required']
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'excused'],
      required: [true, 'Status is required']
    },
    time: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recorded by is required']
    },
    subject: {
      type: String,
      trim: true
    },
    period: {
      type: Number,
      min: 1,
      max: 8
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound index for efficient queries
attendanceSchema.index({ student: 1, date: 1 });
attendanceSchema.index({ class: 1, date: 1 });
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ status: 1 });

// Virtual for formatted date
attendanceSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Virtual for formatted time
attendanceSchema.virtual('formattedTime').get(function() {
  if (!this.time) return null;
  return this.time;
});

// Method to get attendance statistics for a student
attendanceSchema.statics.getStudentStats = async function(studentId, startDate, endDate) {
  const pipeline = [
    {
      $match: {
        student: mongoose.Types.ObjectId(studentId),
        date: { $gte: startDate, $lte: endDate },
        isActive: true
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        present: {
          $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
        },
        absent: {
          $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
        },
        late: {
          $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] }
        },
        excused: {
          $sum: { $cond: [{ $eq: ['$status', 'excused'] }, 1, 0] }
        }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || { total: 0, present: 0, absent: 0, late: 0, excused: 0 };
};

// Method to get class attendance for a specific date
attendanceSchema.statics.getClassAttendance = async function(className, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return this.find({
    class: className,
    date: { $gte: startOfDay, $lte: endOfDay },
    isActive: true
  }).populate('student', 'name studentId avatar');
};

// Method to get attendance summary for a date range
attendanceSchema.statics.getAttendanceSummary = async function(startDate, endDate, className = null) {
  const matchStage = {
    date: { $gte: startDate, $lte: endDate },
    isActive: true
  };

  if (className) {
    matchStage.class = className;
  }

  const pipeline = [
    { $match: matchStage },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          class: '$class'
        },
        total: { $sum: 1 },
        present: {
          $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
        },
        absent: {
          $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
        },
        late: {
          $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] }
        },
        excused: {
          $sum: { $cond: [{ $eq: ['$status', 'excused'] }, 1, 0] }
        }
      }
    },
    {
      $addFields: {
        attendanceRate: {
          $round: [
            {
              $multiply: [
                {
                  $divide: [
                    { $add: ['$present', '$late'] },
                    '$total'
                  ]
                },
                100
              ]
            },
            2
          ]
        }
      }
    },
    { $sort: { '_id.date': 1 } }
  ];

  return this.aggregate(pipeline);
};

// Method to bulk create attendance records
attendanceSchema.statics.bulkCreate = async function(attendanceData) {
  const records = attendanceData.map(data => ({
    student: data.student,
    class: data.class,
    date: data.date,
    status: data.status,
    time: data.time,
    notes: data.notes,
    recordedBy: data.recordedBy,
    subject: data.subject,
    period: data.period
  }));

  return this.insertMany(records);
};

// Method to update student attendance statistics
attendanceSchema.methods.updateStudentStats = async function() {
  const Student = mongoose.model('Student');
  const student = await Student.findById(this.student);
  
  if (student) {
    const stats = await this.constructor.getStudentStats(
      this.student,
      new Date(new Date().getFullYear(), 0, 1), // Start of year
      new Date()
    );
    
    student.attendance = {
      totalDays: stats.total,
      presentDays: stats.present,
      absentDays: stats.absent,
      lateDays: stats.late
    };
    
    await student.save();
  }
};

// Pre-save middleware to update student stats
attendanceSchema.pre('save', async function(next) {
  if (this.isNew) {
    await this.updateStudentStats();
  }
  next();
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance; 