import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required']
    },
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
    semester: {
      type: String,
      required: [true, 'Semester is required'],
      enum: ['الفصل الأول', 'الفصل الثاني', 'الفصل الصيفي']
    },
    academicYear: {
      type: String,
      required: [true, 'Academic year is required'],
      trim: true
    },
    examType: {
      type: String,
      required: [true, 'Exam type is required'],
      enum: ['midterm', 'final', 'quiz', 'assignment', 'participation']
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: 0,
      max: 100
    },
    totalMarks: {
      type: Number,
      required: [true, 'Total marks is required'],
      min: 1
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'],
      required: [true, 'Grade is required']
    },
    gradePoints: {
      type: Number,
      min: 0,
      max: 4
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher is required']
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recorded by is required']
    },
    recordedAt: {
      type: Date,
      default: Date.now
    },
    comments: {
      type: String,
      trim: true,
      maxlength: [500, 'Comments cannot exceed 500 characters']
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
gradeSchema.index({ student: 1, subject: 1, semester: 1, academicYear: 1 });
gradeSchema.index({ class: 1, subject: 1, semester: 1 });
gradeSchema.index({ teacher: 1, semester: 1 });
gradeSchema.index({ examType: 1 });

// Virtual for grade description in Arabic
gradeSchema.virtual('gradeDescription').get(function() {
  const gradeMap = {
    'A+': 'ممتاز +',
    'A': 'ممتاز',
    'B+': 'جيد جداً +',
    'B': 'جيد جداً',
    'C+': 'جيد +',
    'C': 'جيد',
    'D+': 'مقبول +',
    'D': 'مقبول',
    'F': 'راسب'
  };
  return gradeMap[this.grade] || this.grade;
});

// Virtual for exam type in Arabic
gradeSchema.virtual('examTypeArabic').get(function() {
  const typeMap = {
    'midterm': 'امتحان منتصف الفصل',
    'final': 'امتحان نهائي',
    'quiz': 'اختبار قصير',
    'assignment': 'واجب منزلي',
    'participation': 'مشاركة'
  };
  return typeMap[this.examType] || this.examType;
});

// Pre-save middleware to calculate percentage and grade
gradeSchema.pre('save', function(next) {
  // Calculate percentage
  this.percentage = Math.round((this.score / this.totalMarks) * 100);
  
  // Calculate grade and grade points
  if (this.percentage >= 95) {
    this.grade = 'A+';
    this.gradePoints = 4.0;
  } else if (this.percentage >= 90) {
    this.grade = 'A';
    this.gradePoints = 3.7;
  } else if (this.percentage >= 85) {
    this.grade = 'B+';
    this.gradePoints = 3.3;
  } else if (this.percentage >= 80) {
    this.grade = 'B';
    this.gradePoints = 3.0;
  } else if (this.percentage >= 75) {
    this.grade = 'C+';
    this.gradePoints = 2.3;
  } else if (this.percentage >= 70) {
    this.grade = 'C';
    this.gradePoints = 2.0;
  } else if (this.percentage >= 65) {
    this.grade = 'D+';
    this.gradePoints = 1.3;
  } else if (this.percentage >= 60) {
    this.grade = 'D';
    this.gradePoints = 1.0;
  } else {
    this.grade = 'F';
    this.gradePoints = 0.0;
  }
  
  next();
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade; 