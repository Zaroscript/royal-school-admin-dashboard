import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    date: {
      type: Date,
      required: [true, 'Event date is required']
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
      trim: true
    },
    type: {
      type: String,
      enum: ['meeting', 'event', 'exam', 'trip', 'workshop', 'ceremony'],
      required: [true, 'Event type is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    attendees: {
      type: Number,
      default: 0,
      min: 0
    },
    maxAttendees: {
      type: Number,
      min: 0
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Organizer is required']
    },
    participants: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['organizer', 'participant', 'speaker', 'attendee'],
        default: 'attendee'
      },
      status: {
        type: String,
        enum: ['invited', 'confirmed', 'declined', 'attended'],
        default: 'invited'
      }
    }],
    targetAudience: [{
      type: String,
      enum: ['students', 'teachers', 'parents', 'admin', 'all'],
      default: 'all'
    }],
    grade: {
      type: String,
      enum: [
        'الصف الأول الثانوي',
        'الصف الثاني الثانوي',
        'الصف الثالث الثانوي',
        'جميع الصفوف'
      ]
    },
    duration: {
      type: Number, // in minutes
      min: 15,
      default: 60
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft'
    },
    isRecurring: {
      type: Boolean,
      default: false
    },
    recurrence: {
      pattern: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
      },
      interval: {
        type: Number,
        min: 1
      },
      endDate: Date
    },
    attachments: [{
      name: String,
      url: String,
      type: String
    }],
    tags: [{
      type: String,
      trim: true
    }],
    budget: {
      type: Number,
      min: 0
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters']
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
eventSchema.index({ title: 1 });
eventSchema.index({ date: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ organizer: 1 });
eventSchema.index({ priority: 1 });

// Virtual for formatted date
eventSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Virtual for event type in Arabic
eventSchema.virtual('typeArabic').get(function() {
  const typeMap = {
    'meeting': 'اجتماع',
    'event': 'نشاط',
    'exam': 'امتحان',
    'trip': 'رحلة',
    'workshop': 'ورشة عمل',
    'ceremony': 'حفل'
  };
  return typeMap[this.type] || this.type;
});

// Virtual for priority in Arabic
eventSchema.virtual('priorityArabic').get(function() {
  const priorityMap = {
    'low': 'منخفض',
    'medium': 'متوسط',
    'high': 'عالي'
  };
  return priorityMap[this.priority] || this.priority;
});

// Virtual for status in Arabic
eventSchema.virtual('statusArabic').get(function() {
  const statusMap = {
    'draft': 'مسودة',
    'published': 'منشور',
    'cancelled': 'ملغي',
    'completed': 'مكتمل'
  };
  return statusMap[this.status] || this.status;
});

// Virtual for duration in hours and minutes
eventSchema.virtual('durationFormatted').get(function() {
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

// Virtual for attendance status
eventSchema.virtual('attendanceStatus').get(function() {
  if (!this.maxAttendees) return 'unlimited';
  if (this.attendees >= this.maxAttendees) return 'full';
  return 'available';
});

// Method to add participant
eventSchema.methods.addParticipant = function(userId, role = 'attendee') {
  const existingParticipant = this.participants.find(p => p.user.toString() === userId.toString());
  
  if (existingParticipant) {
    existingParticipant.role = role;
    existingParticipant.status = 'confirmed';
  } else {
    this.participants.push({
      user: userId,
      role: role,
      status: 'confirmed'
    });
  }
  
  this.attendees = this.participants.filter(p => p.status === 'confirmed' || p.status === 'attended').length;
  return this.save();
};

// Method to remove participant
eventSchema.methods.removeParticipant = function(userId) {
  this.participants = this.participants.filter(p => p.user.toString() !== userId.toString());
  this.attendees = this.participants.filter(p => p.status === 'confirmed' || p.status === 'attended').length;
  return this.save();
};

// Method to get upcoming events
eventSchema.statics.getUpcoming = function(limit = 10) {
  const now = new Date();
  return this.find({
    date: { $gte: now },
    status: 'published',
    isActive: true
  })
  .sort({ date: 1 })
  .limit(limit)
  .populate('organizer', 'name email avatar');
};

// Method to get events by type
eventSchema.statics.getByType = function(type, limit = 10) {
  return this.find({
    type: type,
    isActive: true
  })
  .sort({ date: -1 })
  .limit(limit)
  .populate('organizer', 'name email avatar');
};

// Method to get events by date range
eventSchema.statics.getByDateRange = function(startDate, endDate) {
  return this.find({
    date: { $gte: startDate, $lte: endDate },
    isActive: true
  })
  .sort({ date: 1 })
  .populate('organizer', 'name email avatar');
};

// Method to get event statistics
eventSchema.statics.getStats = async function() {
  const pipeline = [
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalEvents: { $sum: 1 },
        upcomingEvents: {
          $sum: {
            $cond: [
              { $and: [{ $gte: ['$date', new Date()] }, { $eq: ['$status', 'published'] }] },
              1,
              0
            ]
          }
        },
        completedEvents: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        totalAttendees: { $sum: '$attendees' }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    totalAttendees: 0
  };
};

// Method to get public profile
eventSchema.methods.getPublicProfile = function() {
  const eventObject = this.toObject();
  delete eventObject.__v;
  return eventObject;
};

const Event = mongoose.model("Event", eventSchema);

export default Event; 