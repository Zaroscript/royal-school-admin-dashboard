import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Teacher name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true
    },
    experience: {
      type: Number,
      min: 0,
      default: 0
    },
    studentsCount: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on_leave'],
      default: 'active'
    },
    joinDate: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    completionRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    specializations: [{
      type: String,
      trim: true
    }],
    achievements: [{
      type: String,
      trim: true
    }],
    certifications: [{
      type: String,
      trim: true
    }],
    upcomingClasses: {
      type: Number,
      default: 0
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    department: {
      type: String,
      trim: true
    },
    qualification: {
      type: String,
      trim: true
    },
    salary: {
      type: Number,
      min: 0
    },
    address: {
      type: String,
      trim: true
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    schedule: {
      workingDays: [{
        type: String,
        enum: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
      }],
      workingHours: {
        start: String,
        end: String
      }
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
// teacherSchema.index({ email: 1 });
teacherSchema.index({ name: 1 });
teacherSchema.index({ subject: 1 });
teacherSchema.index({ status: 1 });
teacherSchema.index({ isActive: 1 });

// Virtual for years of experience
teacherSchema.virtual('yearsOfExperience').get(function() {
  if (!this.joinDate) return 0;
  const today = new Date();
  const joinDate = new Date(this.joinDate);
  let years = today.getFullYear() - joinDate.getFullYear();
  const monthDiff = today.getMonth() - joinDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < joinDate.getDate())) {
    years--;
  }
  
  return Math.max(years, 0);
});

// Virtual for performance score
teacherSchema.virtual('performanceScore').get(function() {
  const ratingWeight = 0.4;
  const completionWeight = 0.4;
  const experienceWeight = 0.2;
  
  const ratingScore = (this.rating / 5) * 100;
  const completionScore = this.completionRate;
  const experienceScore = Math.min(this.yearsOfExperience * 10, 100);
  
  return Math.round(
    (ratingScore * ratingWeight) + 
    (completionScore * completionWeight) + 
    (experienceScore * experienceWeight)
  );
});

// Method to update last active
teacherSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save();
};

// Method to update rating
teacherSchema.methods.updateRating = function(newRating) {
  // Simple average calculation - in production you might want weighted average
  const totalRatings = this.rating * this.studentsCount + newRating;
  this.studentsCount += 1;
  this.rating = totalRatings / this.studentsCount;
  return this.save();
};

// Method to get public profile
teacherSchema.methods.getPublicProfile = function() {
  const teacherObject = this.toObject();
  delete teacherObject.__v;
  delete teacherObject.salary;
  delete teacherObject.emergencyContact;
  return teacherObject;
};

// Static method to get teachers by subject
teacherSchema.statics.getBySubject = function(subject) {
  return this.find({ 
    subject: new RegExp(subject, 'i'),
    isActive: true,
    status: 'active'
  });
};

// Static method to get top performing teachers
teacherSchema.statics.getTopPerformers = function(limit = 10) {
  return this.find({ 
    isActive: true,
    status: 'active'
  })
  .sort({ rating: -1, completionRate: -1 })
  .limit(limit);
};

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher; 