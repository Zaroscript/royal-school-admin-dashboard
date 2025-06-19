import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Schedule title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      enum: [
        'الصف الأول الثانوي',
        'الصف الثاني الثانوي',
        'الصف الثالث الثانوي'
      ]
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      enum: ['أ', 'ب', 'ج', 'د', 'ه', 'و']
    },
    academicYear: {
      type: String,
      required: [true, 'Academic year is required'],
      trim: true
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      enum: ['الفصل الأول', 'الفصل الثاني', 'الفصل الصيفي']
    },
    periods: [{
      day: {
        type: String,
        enum: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        required: true
      },
      periodNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 8
      },
      startTime: {
        type: String,
        required: true,
        trim: true
      },
      endTime: {
        type: String,
        required: true,
        trim: true
      },
      subject: {
        type: String,
        required: true,
        trim: true
      },
      teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
      },
      room: {
        type: String,
        required: true,
        trim: true
      },
      type: {
        type: String,
        enum: ['lecture', 'lab', 'exam', 'break', 'activity'],
        default: 'lecture'
      },
      notes: {
        type: String,
        trim: true
      }
    }],
    breaks: [{
      day: {
        type: String,
        enum: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
      },
      startTime: String,
      endTime: String,
      type: {
        type: String,
        enum: ['break', 'lunch', 'prayer'],
        default: 'break'
      }
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required']
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'rejected', 'active', 'inactive'],
      default: 'draft'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
scheduleSchema.index({ class: 1, grade: 1, section: 1 });
scheduleSchema.index({ academicYear: 1, semester: 1 });
scheduleSchema.index({ status: 1 });
scheduleSchema.index({ isActive: 1 });
scheduleSchema.index({ createdBy: 1 });

// Virtual for full class name
scheduleSchema.virtual('fullClassName').get(function() {
  return `${this.grade} - ${this.section}`;
});

// Virtual for status in Arabic
scheduleSchema.virtual('statusArabic').get(function() {
  const statusMap = {
    'draft': 'مسودة',
    'pending': 'قيد المراجعة',
    'approved': 'معتمد',
    'rejected': 'مرفوض',
    'active': 'نشط',
    'inactive': 'غير نشط'
  };
  return statusMap[this.status] || this.status;
});

// Virtual for semester in Arabic
scheduleSchema.virtual('semesterArabic').get(function() {
  return this.semester; // Already in Arabic
});

// Method to get schedule for a specific day
scheduleSchema.methods.getDaySchedule = function(day) {
  return this.periods
    .filter(period => period.day === day)
    .sort((a, b) => a.periodNumber - b.periodNumber);
};

// Method to get teacher schedule
scheduleSchema.methods.getTeacherSchedule = function(teacherId) {
  return this.periods.filter(period => 
    period.teacher.toString() === teacherId.toString()
  );
};

// Method to get subject schedule
scheduleSchema.methods.getSubjectSchedule = function(subject) {
  return this.periods.filter(period => 
    period.subject.toLowerCase() === subject.toLowerCase()
  );
};

// Method to check for conflicts
scheduleSchema.methods.checkConflicts = function() {
  const conflicts = [];
  const teacherSchedules = {};
  const roomSchedules = {};

  this.periods.forEach(period => {
    const key = `${period.day}_${period.periodNumber}`;
    
    // Check teacher conflicts
    if (teacherSchedules[key] && teacherSchedules[key] !== period.teacher.toString()) {
      conflicts.push({
        type: 'teacher',
        day: period.day,
        period: period.periodNumber,
        message: 'Teacher has conflicting schedule'
      });
    } else {
      teacherSchedules[key] = period.teacher.toString();
    }

    // Check room conflicts
    if (roomSchedules[key] && roomSchedules[key] !== period.room) {
      conflicts.push({
        type: 'room',
        day: period.day,
        period: period.periodNumber,
        message: 'Room is already occupied'
      });
    } else {
      roomSchedules[key] = period.room;
    }
  });

  return conflicts;
};

// Static method to get schedule by class
scheduleSchema.statics.getByClass = function(grade, section, academicYear, semester) {
  return this.findOne({
    grade: grade,
    section: section,
    academicYear: academicYear,
    semester: semester,
    isActive: true,
    status: { $in: ['approved', 'active'] }
  }).populate('periods.teacher', 'name email avatar');
};

// Static method to get teacher schedules
scheduleSchema.statics.getTeacherSchedules = function(teacherId, academicYear, semester) {
  return this.find({
    'periods.teacher': teacherId,
    academicYear: academicYear,
    semester: semester,
    isActive: true,
    status: { $in: ['approved', 'active'] }
  }).populate('periods.teacher', 'name email avatar');
};

// Static method to get all active schedules
scheduleSchema.statics.getActiveSchedules = function(academicYear, semester) {
  return this.find({
    academicYear: academicYear,
    semester: semester,
    isActive: true,
    status: { $in: ['approved', 'active'] }
  }).populate('periods.teacher', 'name email avatar');
};

// Static method to get schedule statistics
scheduleSchema.statics.getStats = async function() {
  const pipeline = [
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalSchedules: { $sum: 1 },
        activeSchedules: {
          $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
        },
        pendingSchedules: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        totalPeriods: { $sum: { $size: '$periods' } }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalSchedules: 0,
    activeSchedules: 0,
    pendingSchedules: 0,
    totalPeriods: 0
  };
};

// Method to get public profile
scheduleSchema.methods.getPublicProfile = function() {
  const scheduleObject = this.toObject();
  delete scheduleObject.__v;
  return scheduleObject;
};

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule; 