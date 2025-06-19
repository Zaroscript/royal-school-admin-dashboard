import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      maxlength: [200, 'Course name cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, 'Teacher is required']
    },
    studentsCount: {
      type: Number,
      default: 0,
      min: 0
    },
    totalHours: {
      type: Number,
      required: [true, 'Total hours is required'],
      min: 1
    },
    completedHours: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'draft', 'paused'],
      default: 'draft'
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
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
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'الرياضيات',
        'اللغة العربية',
        'اللغة الإنجليزية',
        'العلوم',
        'العلوم الاجتماعية',
        'اللغات',
        'الكمبيوتر',
        'التربية الرياضية',
        'الفنون',
        'أخرى'
      ]
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate'
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    reviewsCount: {
      type: Number,
      default: 0,
      min: 0
    },
    modules: {
      type: Number,
      default: 0,
      min: 0
    },
    assignments: {
      type: Number,
      default: 0,
      min: 0
    },
    materials: {
      type: Number,
      default: 0,
      min: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    tags: [{
      type: String,
      trim: true
    }],
    syllabus: [{
      title: String,
      description: String,
      duration: Number, // in hours
      order: Number
    }],
    requirements: [{
      type: String,
      trim: true
    }],
    objectives: [{
      type: String,
      trim: true
    }],
    maxStudents: {
      type: Number,
      default: 30,
      min: 1
    },
    price: {
      type: Number,
      default: 0,
      min: 0
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

// Indexes for better query performance
courseSchema.index({ name: 1 });
courseSchema.index({ teacher: 1 });
courseSchema.index({ grade: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ isActive: 1 });

// Virtual for completion percentage
courseSchema.virtual('completionPercentage').get(function() {
  if (this.totalHours === 0) return 0;
  return Math.round((this.completedHours / this.totalHours) * 100);
});

// Virtual for average rating
courseSchema.virtual('averageRating').get(function() {
  if (this.reviewsCount === 0) return 0;
  return Math.round((this.rating / this.reviewsCount) * 10) / 10;
});

// Virtual for course duration in days
courseSchema.virtual('durationInDays').get(function() {
  if (!this.startDate || !this.endDate) return 0;
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for enrollment status
courseSchema.virtual('enrollmentStatus').get(function() {
  if (this.studentsCount >= this.maxStudents) return 'full';
  if (this.status === 'active') return 'open';
  if (this.status === 'completed') return 'completed';
  return 'closed';
});

// Method to update completion
courseSchema.methods.updateCompletion = function(completedHours) {
  this.completedHours = Math.min(completedHours, this.totalHours);
  if (this.completedHours >= this.totalHours) {
    this.status = 'completed';
  }
  this.lastUpdated = new Date();
  return this.save();
};

// Method to add student
courseSchema.methods.addStudent = function() {
  if (this.studentsCount < this.maxStudents) {
    this.studentsCount += 1;
    return this.save();
  }
  throw new Error('Course is full');
};

// Method to remove student
courseSchema.methods.removeStudent = function() {
  if (this.studentsCount > 0) {
    this.studentsCount -= 1;
    return this.save();
  }
  throw new Error('No students to remove');
};

// Method to update rating
courseSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating + newRating;
  this.reviewsCount += 1;
  this.rating = totalRating;
  return this.save();
};

// Method to get public profile
courseSchema.methods.getPublicProfile = function() {
  const courseObject = this.toObject();
  delete courseObject.__v;
  return courseObject;
};

// Static method to get courses by teacher
courseSchema.statics.getByTeacher = function(teacherId) {
  return this.find({ 
    teacher: teacherId,
    isActive: true
  }).populate('teacher', 'name email avatar');
};

// Static method to get courses by grade
courseSchema.statics.getByGrade = function(grade) {
  return this.find({ 
    grade: grade,
    isActive: true,
    status: 'active'
  }).populate('teacher', 'name email avatar');
};

// Static method to get top rated courses
courseSchema.statics.getTopRated = function(limit = 10) {
  return this.find({ 
    isActive: true,
    status: 'active'
  })
  .sort({ rating: -1, reviewsCount: -1 })
  .limit(limit)
  .populate('teacher', 'name email avatar');
};

const Course = mongoose.model("Course", courseSchema);

export default Course; 