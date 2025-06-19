import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/course.model.js';
import Teacher from '../models/teacher.model.js';

dotenv.config({ path: '../../.env' });

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);

    // Find teachers by email
    const salah = await Teacher.findOne({ email: 'm.salah@school.com' });
    const fatma = await Teacher.findOne({ email: 'f.youssef@school.com' });

    if (!salah || !fatma) throw new Error('Teachers not found. Seed teachers first!');

    const courses = [
      {
        name: 'الجبر 1',
        code: 'ALG101',
        description: 'مقدمة في الجبر للصف الأول الثانوي',
        teacher: salah._id,
        totalHours: 40,
        startDate: new Date('2024-09-01'),
        endDate: new Date('2025-01-15'),
        grade: 'الصف الأول الثانوي',
        category: 'الرياضيات',
        status: 'active',
        isActive: true
      },
      {
        name: 'الفيزياء 1',
        code: 'PHY201',
        description: 'مقدمة في الفيزياء للصف الثاني الثانوي',
        teacher: fatma._id,
        totalHours: 35,
        startDate: new Date('2024-09-01'),
        endDate: new Date('2025-01-15'),
        grade: 'الصف الثاني الثانوي',
        category: 'العلوم',
        status: 'active',
        isActive: true
      }
    ];

    await Course.deleteMany({});
    await Course.insertMany(courses);
    console.log('Seeded courses:', courses.map(c => c.name));
    process.exit(0);
  } catch (err) {
    console.error('Seeding courses error:', err);
    process.exit(1);
  }
}
seed(); 