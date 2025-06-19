import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Finance from '../models/finance.model.js';
import Student from '../models/student.model.js';
import Teacher from '../models/teacher.model.js';
import User from '../models/user.model.js';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);

    // Find references
    const ali = await Student.findOne({ name: 'Ali Hassan' });
    const salah = await Teacher.findOne({ email: 'm.salah@school.com' });
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!ali || !salah || !admin) throw new Error('Referenced documents not found. Seed users, students, and teachers first!');

    const finance = [
      {
        type: 'income',
        description: 'دفع مصروفات دراسية',
        amount: 5000,
        date: new Date('2024-05-10'),
        category: 'مصروفات',
        status: 'completed',
        paymentMethod: 'نقداً',
        student: ali._id,
        recordedBy: admin._id,
        isActive: true
      },
      {
        type: 'expense',
        description: 'صرف راتب المعلم',
        amount: 8000,
        date: new Date('2024-05-05'),
        category: 'رواتب',
        status: 'completed',
        paymentMethod: 'تحويل بنكي',
        teacher: salah._id,
        recordedBy: admin._id,
        isActive: true
      }
    ];

    await Finance.deleteMany({});
    await Finance.insertMany(finance);
    console.log('Seeded finance records:', finance.length);
    process.exit(0);
  } catch (err) {
    console.error('Seeding finance error:', err);
    process.exit(1);
  }
}
seed(); 