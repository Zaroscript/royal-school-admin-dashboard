import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Document name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters']
    },
    originalName: {
      type: String,
      required: [true, 'Original file name is required'],
      trim: true
    },
    type: {
      type: String,
      enum: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'image', 'video', 'audio', 'other'],
      required: [true, 'File type is required']
    },
    size: {
      type: Number,
      required: [true, 'File size is required'],
      min: 0
    },
    url: {
      type: String,
      required: [true, 'File URL is required'],
      trim: true
    },
    thumbnail: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'reports',
        'schedules',
        'results',
        'events',
        'policies',
        'curriculum',
        'forms',
        'announcements',
        'photos',
        'videos',
        'other'
      ]
    },
    subcategory: {
      type: String,
      trim: true
    },
    tags: [{
      type: String,
      trim: true
    }],
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploaded by is required']
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    lastModified: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'deleted'],
      default: 'active'
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'restricted'],
      default: 'public'
    },
    accessLevel: {
      type: String,
      enum: ['all', 'admin', 'moderator', 'teacher', 'student'],
      default: 'all'
    },
    downloadCount: {
      type: Number,
      default: 0,
      min: 0
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0
    },
    isPublic: {
      type: Boolean,
      default: true
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
documentSchema.index({ name: 1 });
documentSchema.index({ category: 1 });
documentSchema.index({ type: 1 });
documentSchema.index({ uploadedBy: 1 });
documentSchema.index({ status: 1 });
documentSchema.index({ isActive: 1 });
documentSchema.index({ tags: 1 });

// Virtual for formatted file size
documentSchema.virtual('formattedSize').get(function() {
  const bytes = this.size;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
});

// Virtual for file type icon
documentSchema.virtual('fileIcon').get(function() {
  const iconMap = {
    'pdf': 'file-pdf',
    'doc': 'file-word',
    'docx': 'file-word',
    'xls': 'file-excel',
    'xlsx': 'file-excel',
    'ppt': 'file-powerpoint',
    'pptx': 'file-powerpoint',
    'image': 'file-image',
    'video': 'file-video',
    'audio': 'file-audio',
    'other': 'file'
  };
  return iconMap[this.type] || 'file';
});

// Virtual for category in Arabic
documentSchema.virtual('categoryArabic').get(function() {
  const categoryMap = {
    'reports': 'التقارير',
    'schedules': 'الجداول',
    'results': 'النتائج',
    'events': 'الفعاليات',
    'policies': 'السياسات',
    'curriculum': 'المناهج',
    'forms': 'النماذج',
    'announcements': 'الإعلانات',
    'photos': 'الصور',
    'videos': 'الفيديوهات',
    'other': 'أخرى'
  };
  return categoryMap[this.category] || this.category;
});

// Virtual for status in Arabic
documentSchema.virtual('statusArabic').get(function() {
  const statusMap = {
    'active': 'نشط',
    'archived': 'مؤرشف',
    'deleted': 'محذوف'
  };
  return statusMap[this.status] || this.status;
});

// Method to increment download count
documentSchema.methods.incrementDownload = function() {
  this.downloadCount += 1;
  this.lastModified = new Date();
  return this.save();
};

// Method to increment view count
documentSchema.methods.incrementView = function() {
  this.viewCount += 1;
  return this.save();
};

// Method to archive document
documentSchema.methods.archive = function() {
  this.status = 'archived';
  this.lastModified = new Date();
  return this.save();
};

// Method to restore document
documentSchema.methods.restore = function() {
  this.status = 'active';
  this.lastModified = new Date();
  return this.save();
};

// Static method to search documents
documentSchema.statics.search = function(query, filters = {}) {
  const searchQuery = {
    isActive: true,
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { tags: { $in: [new RegExp(query, 'i')] } }
    ]
  };

  // Apply additional filters
  if (filters.category) searchQuery.category = filters.category;
  if (filters.type) searchQuery.type = filters.type;
  if (filters.status) searchQuery.status = filters.status;
  if (filters.uploadedBy) searchQuery.uploadedBy = filters.uploadedBy;

  return this.find(searchQuery)
    .sort({ uploadedAt: -1 })
    .populate('uploadedBy', 'name email avatar');
};

// Static method to get documents by category
documentSchema.statics.getByCategory = function(category, limit = 20) {
  return this.find({
    category: category,
    isActive: true,
    status: 'active'
  })
  .sort({ uploadedAt: -1 })
  .limit(limit)
  .populate('uploadedBy', 'name email avatar');
};

// Static method to get recent documents
documentSchema.statics.getRecent = function(limit = 10) {
  return this.find({
    isActive: true,
    status: 'active'
  })
  .sort({ uploadedAt: -1 })
  .limit(limit)
  .populate('uploadedBy', 'name email avatar');
};

// Static method to get most downloaded documents
documentSchema.statics.getMostDownloaded = function(limit = 10) {
  return this.find({
    isActive: true,
    status: 'active'
  })
  .sort({ downloadCount: -1 })
  .limit(limit)
  .populate('uploadedBy', 'name email avatar');
};

// Static method to get document statistics
documentSchema.statics.getStats = async function() {
  const pipeline = [
    { $match: { isActive: true } },
    {
      $group: {
        _id: null,
        totalDocuments: { $sum: 1 },
        totalSize: { $sum: '$size' },
        totalDownloads: { $sum: '$downloadCount' },
        totalViews: { $sum: '$viewCount' },
        totalCategories: { $addToSet: '$category' }
      }
    },
    {
      $project: {
        totalDocuments: 1,
        totalSize: 1,
        totalDownloads: 1,
        totalViews: 1,
        totalCategories: { $size: '$totalCategories' }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalDocuments: 0,
    totalSize: 0,
    totalDownloads: 0,
    totalViews: 0,
    totalCategories: 0
  };
};

// Method to get public profile
documentSchema.methods.getPublicProfile = function() {
  const documentObject = this.toObject();
  delete documentObject.__v;
  return documentObject;
};

const Document = mongoose.model("Document", documentSchema);

export default Document; 