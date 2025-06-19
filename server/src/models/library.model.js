import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'تعليمي',
        'علوم',
        'أدب',
        'تاريخ',
        'جغرافيا',
        'رياضيات',
        'لغة عربية',
        'لغة إنجليزية',
        'فلسفة',
        'دين',
        'أخرى'
      ]
    },
    subcategory: {
      type: String,
      trim: true
    },
    publisher: {
      type: String,
      trim: true
    },
    publishYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear()
    },
    edition: {
      type: String,
      trim: true
    },
    pages: {
      type: Number,
      min: 1
    },
    language: {
      type: String,
      enum: ['عربي', 'إنجليزي', 'فرنسي', 'ألماني', 'أخرى'],
      default: 'عربي'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    coverImage: {
      type: String,
      default: ''
    },
    totalCopies: {
      type: Number,
      required: [true, 'Total copies is required'],
      min: 1,
      default: 1
    },
    availableCopies: {
      type: Number,
      min: 0,
      default: 1
    },
    borrowedCopies: {
      type: Number,
      min: 0,
      default: 0
    },
    location: {
      shelf: String,
      row: String,
      position: String
    },
    status: {
      type: String,
      enum: ['available', 'borrowed', 'reserved', 'maintenance', 'lost'],
      default: 'available'
    },
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: 'good'
    },
    tags: [{
      type: String,
      trim: true
    }],
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Added by is required']
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    lastUpdated: {
      type: Date,
      default: Date.now
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
librarySchema.index({ title: 1 });
librarySchema.index({ author: 1 });
librarySchema.index({ category: 1 });
librarySchema.index({ status: 1 });
librarySchema.index({ isActive: 1 });

// Virtual for availability status
librarySchema.virtual('availabilityStatus').get(function() {
  if (this.availableCopies > 0) return 'available';
  if (this.borrowedCopies > 0) return 'borrowed';
  return 'unavailable';
});

// Virtual for condition in Arabic
librarySchema.virtual('conditionArabic').get(function() {
  const conditionMap = {
    'excellent': 'ممتاز',
    'good': 'جيد',
    'fair': 'مقبول',
    'poor': 'سيء'
  };
  return conditionMap[this.condition] || this.condition;
});

// Virtual for status in Arabic
librarySchema.virtual('statusArabic').get(function() {
  const statusMap = {
    'available': 'متوفر',
    'borrowed': 'مستعار',
    'reserved': 'محجوز',
    'maintenance': 'صيانة',
    'lost': 'مفقود'
  };
  return statusMap[this.status] || this.status;
});

// Method to borrow a book
librarySchema.methods.borrow = function() {
  if (this.availableCopies > 0) {
    this.availableCopies -= 1;
    this.borrowedCopies += 1;
    
    if (this.availableCopies === 0) {
      this.status = 'borrowed';
    }
    
    this.lastUpdated = new Date();
    return this.save();
  }
  throw new Error('No copies available for borrowing');
};

// Method to return a book
librarySchema.methods.return = function() {
  if (this.borrowedCopies > 0) {
    this.borrowedCopies -= 1;
    this.availableCopies += 1;
    
    if (this.availableCopies > 0) {
      this.status = 'available';
    }
    
    this.lastUpdated = new Date();
    return this.save();
  }
  throw new Error('No borrowed copies to return');
};

// Method to reserve a book
librarySchema.methods.reserve = function() {
  if (this.availableCopies > 0) {
    this.status = 'reserved';
    this.lastUpdated = new Date();
    return this.save();
  }
  throw new Error('No copies available for reservation');
};

// Static method to search books
librarySchema.statics.search = function(query, filters = {}) {
  const searchQuery = {
    isActive: true,
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } },
      { isbn: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ]
  };

  // Apply additional filters
  if (filters.category) searchQuery.category = filters.category;
  if (filters.status) searchQuery.status = filters.status;
  if (filters.language) searchQuery.language = filters.language;

  return this.find(searchQuery)
    .sort({ title: 1 })
    .populate('addedBy', 'name');
};

// Static method to get books by category
librarySchema.statics.getByCategory = function(category, limit = 20) {
  return this.find({
    category: category,
    isActive: true
  })
  .sort({ title: 1 })
  .limit(limit)
  .populate('addedBy', 'name');
};

// Static method to get available books
librarySchema.statics.getAvailable = function(limit = 20) {
  return this.find({
    availableCopies: { $gt: 0 },
    isActive: true
  })
  .sort({ title: 1 })
  .limit(limit)
  .populate('addedBy', 'name');
};

// Static method to get most borrowed books
librarySchema.statics.getMostBorrowed = function(limit = 10) {
  return this.find({
    isActive: true
  })
  .sort({ borrowedCopies: -1 })
  .limit(limit)
  .populate('addedBy', 'name');
};

// Static method to get library statistics
librarySchema.statics.getStats = async function() {
  const pipeline = [
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalBooks: { $sum: 1 },
        totalCopies: { $sum: '$totalCopies' },
        availableCopies: { $sum: '$availableCopies' },
        borrowedCopies: { $sum: '$borrowedCopies' },
        totalCategories: { $addToSet: '$category' }
      }
    },
    {
      $project: {
        totalBooks: 1,
        totalCopies: 1,
        availableCopies: 1,
        borrowedCopies: 1,
        totalCategories: { $size: '$totalCategories' }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalBooks: 0,
    totalCopies: 0,
    availableCopies: 0,
    borrowedCopies: 0,
    totalCategories: 0
  };
};

// Method to get public profile
librarySchema.methods.getPublicProfile = function() {
  const bookObject = this.toObject();
  delete bookObject.__v;
  return bookObject;
};

const Library = mongoose.model("Library", librarySchema);

export default Library; 