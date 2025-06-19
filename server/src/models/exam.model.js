import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true
    },
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Exam date is required']
    },
    time: {
      type: String,
      required: [true, 'Exam time is required'],
      trim: true
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: 15,
      max: 180 // 3 hours max
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    students: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    type: {
      type: String,
      enum: ['midterm', 'final', 'quiz', 'assignment'],
      required: [true, 'Exam type is required']
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher is required']
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
    totalMarks: {
      type: Number,
      required: [true, 'Total marks is required'],
      min: 1
    },
    passingMarks: {
      type: Number,
      required: [true, 'Passing marks is required'],
      min: 1
    },
    averageScore: {
      type: Number,
      min: 0,
      default: 0
    },
    highestScore: {
      type: Number,
      min: 0,
      default: 0
    },
    lowestScore: {
      type: Number,
      min: 0,
      default: 0
    },
    passRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    totalStudents: {
      type: Number,
      default: 0,
      min: 0
    },
    passedStudents: {
      type: Number,
      default: 0,
      min: 0
    },
    instructions: [{
      type: String,
      trim: true
    }],
    topics: [{
      type: String,
      trim: true
    }],
    materials: [{
      name: String,
      type: String, // 'document', 'link', 'file'
      url: String
    }],
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

// Indexes for better query performance
examSchema.index({ subject: 1 });
examSchema.index({ class: 1 });
examSchema.index({ date: 1 });
examSchema.index({ status: 1 });
examSchema.index({ type: 1 });
examSchema.index({ teacher: 1 });

// Virtual for formatted date
examSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Virtual for exam status in Arabic
examSchema.virtual('statusArabic').get(function() {
  const statusMap = {
    'scheduled': 'مجدول',
    'in_progress': 'قيد التنفيذ',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
  };
  return statusMap[this.status] || this.status;
});

// Virtual for exam type in Arabic
examSchema.virtual('typeArabic').get(function() {
  const typeMap = {
    'midterm': 'امتحان منتصف الفصل',
    'final': 'امتحان نهائي',
    'quiz': 'اختبار قصير',
    'assignment': 'واجب منزلي'
  };
  return typeMap[this.type] || this.type;
});

// Virtual for exam duration in hours and minutes
examSchema.virtual('durationFormatted').get(function() {
  const hours = Math.floor(this.duration / 60);
  const minutes = this.duration % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours} ساعة و ${minutes} دقيقة`;
  } else if (hours > 0) {
    return `${hours} ساعة`;
  } else {
    return `${minutes} دقيقة`;
  }
});

// Method to update exam statistics
examSchema.methods.updateStats = function(scores) {
  if (!scores || scores.length === 0) return;
  
  this.averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  this.highestScore = Math.max(...scores);
  this.lowestScore = Math.min(...scores);
  this.totalStudents = scores.length;
  this.passedStudents = scores.filter(score => score >= this.passingMarks).length;
  this.passRate = (this.passedStudents / this.totalStudents) * 100;
  
  return this.save();
};

// Method to get upcoming exams
examSchema.statics.getUpcoming = function(limit = 10) {
  const now = new Date();
  return this.find({
    date: { $gte: now },
    status: 'scheduled',
    isActive: true
  })
  .sort({ date: 1 })
  .limit(limit)
  .populate('teacher', 'name email avatar');
};

// Method to get completed exams
examSchema.statics.getCompleted = function(limit = 10) {
  return this.find({
    status: 'completed',
    isActive: true
  })
  .sort({ date: -1 })
  .limit(limit)
  .populate('teacher', 'name email avatar');
};

// Method to get exams by teacher
examSchema.statics.getByTeacher = function(teacherId) {
  return this.find({
    teacher: teacherId,
    isActive: true
  })
  .sort({ date: -1 })
  .populate('teacher', 'name email avatar');
};

// Method to get exams by class
examSchema.statics.getByClass = function(className) {
  return this.find({
    class: className,
    isActive: true
  })
  .sort({ date: -1 })
  .populate('teacher', 'name email avatar');
};

// Method to get exam statistics
examSchema.statics.getStats = async function() {
  const pipeline = [
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalExams: { $sum: 1 },
        upcomingExams: {
          $sum: {
            $cond: [
              { $and: [{ $gte: ['$date', new Date()] }, { $eq: ['$status', 'scheduled'] }] },
              1,
              0
            ]
          }
        },
        completedExams: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        averageScore: { $avg: '$averageScore' },
        averagePassRate: { $avg: '$passRate' }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalExams: 0,
    upcomingExams: 0,
    completedExams: 0,
    averageScore: 0,
    averagePassRate: 0
  };
};

// Method to get public profile
examSchema.methods.getPublicProfile = function() {
  const examObject = this.toObject();
  delete examObject.__v;
  return examObject;
};

const Exam = mongoose.model("Exam", examSchema);

export default Exam; 