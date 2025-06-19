import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
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
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    status: {
      type: String,
      enum: ['نشط', 'غائب', 'متوقف', 'متخرج'],
      default: 'نشط'
    },
    avatar: {
      type: String,
      default: ''
    },
    parentName: {
      type: String,
      required: [true, 'Parent name is required'],
      trim: true
    },
    parentPhone: {
      type: String,
      required: [true, 'Parent phone is required'],
      trim: true
    },
    parentEmail: {
      type: String,
      lowercase: true,
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true
    },
    birthDate: {
      type: Date,
      required: [true, 'Birth date is required']
    },
    gender: {
      type: String,
      required: [true, 'الجنس مطلوب'],
      enum: ['ذكر', 'أنثى']
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    medicalNotes: {
      type: String,
      trim: true,
      maxlength: [500, 'Medical notes cannot exceed 500 characters']
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    academicInfo: {
      gpa: {
        type: Number,
        min: 0,
        max: 4
      },
      totalCredits: {
        type: Number,
        default: 0
      },
      currentSemester: {
        type: String,
        default: 'الفصل الأول'
      }
    },
    attendance: {
      totalDays: {
        type: Number,
        default: 0
      },
      presentDays: {
        type: Number,
        default: 0
      },
      absentDays: {
        type: Number,
        default: 0
      },
      lateDays: {
        type: Number,
        default: 0
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
studentSchema.index({ name: 1 });
studentSchema.index({ grade: 1, section: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ isActive: 1 });

// Virtual for attendance percentage
studentSchema.virtual('attendancePercentage').get(function() {
  if (this.attendance.totalDays === 0) return 0;
  return Math.round((this.attendance.presentDays / this.attendance.totalDays) * 100);
});

// Virtual for age
studentSchema.virtual('age').get(function() {
  if (!this.birthDate) return null;
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Virtual for full grade name
studentSchema.virtual('fullGradeName').get(function() {
  return `${this.grade} - ${this.section}`;
});

// Method to update attendance
studentSchema.methods.updateAttendance = function(status) {
  this.attendance.totalDays += 1;
  
  switch (status) {
    case 'present':
      this.attendance.presentDays += 1;
      break;
    case 'absent':
      this.attendance.absentDays += 1;
      break;
    case 'late':
      this.attendance.lateDays += 1;
      break;
  }
  
  return this.save();
};

// Method to get public profile
studentSchema.methods.getPublicProfile = function() {
  const studentObject = this.toObject();
  delete studentObject.__v;
  return studentObject;
};

// Static method to generate student ID
studentSchema.statics.generateStudentId = async function() {
  const year = new Date().getFullYear();
  const count = await this.countDocuments({ 
    studentId: new RegExp(`^STU${year}`) 
  });
  return `STU${year}${String(count + 1).padStart(3, '0')}`;
};

const Student = mongoose.model("Student", studentSchema);

export default Student; 