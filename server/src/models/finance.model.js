import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Transaction type is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'completed'
    },
    paymentMethod: {
      type: String,
      enum: ['نقداً', 'بطاقة ائتمان', 'تحويل بنكي', 'شيك', 'أخرى'],
      required: [true, 'Payment method is required']
    },
    reference: {
      type: String,
      trim: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recorded by is required']
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
    attachments: [{
      name: String,
      url: String,
      type: String
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
financeSchema.index({ type: 1 });
financeSchema.index({ category: 1 });
financeSchema.index({ date: 1 });
financeSchema.index({ status: 1 });
financeSchema.index({ student: 1 });
financeSchema.index({ teacher: 1 });

// Virtual for formatted date
financeSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Virtual for formatted amount
financeSchema.virtual('formattedAmount').get(function() {
  return this.amount.toLocaleString('ar-EG', {
    style: 'currency',
    currency: 'EGP'
  });
});

// Virtual for transaction type in Arabic
financeSchema.virtual('typeArabic').get(function() {
  return this.type === 'income' ? 'إيراد' : 'مصروف';
});

// Virtual for status in Arabic
financeSchema.virtual('statusArabic').get(function() {
  const statusMap = {
    'pending': 'قيد الانتظار',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
  };
  return statusMap[this.status] || this.status;
});

const Finance = mongoose.model("Finance", financeSchema);

export default Finance; 