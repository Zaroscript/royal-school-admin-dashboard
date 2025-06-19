import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grade from '../models/grade.model.js';
import Student from '../models/student.model.js';
import Teacher from '../models/teacher.model.js';
import User from '../models/user.model.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);

    // Find references
    const ali = await Student.findOne({ name: 'Ali Hassan' });
    const sara = await Student.findOne({ name: 'Sara Ahmed' });
    const salah = await Teacher.findOne({ email: 'm.salah@school.com' });
    const fatma = await Teacher.findOne({ email: 'f.youssef@school.com' });
    const admin = await User.findOne({ email: 'admin@example.com' });

    if (!ali || !sara || !salah || !fatma || !admin) throw new Error('Referenced documents not found. Seed users, students, and teachers first!');

    const grades = [
      {
        student: ali._id,
        subject: 'الرياضيات',
        class: 'الصف الأول الثانوي',
        semester: 'الفصل الأول',
        academicYear: '2024',
        examType: 'midterm',
        score: 95,
        totalMarks: 100,
        grade: 'A+',
        teacher: salah._id,
        recordedBy: admin._id,
        isActive: true
      },
      {
        student: sara._id,
        subject: 'الفيزياء',
        class: 'الصف الثاني الثانوي',
        semester: 'الفصل الأول',
        academicYear: '2024',
        examType: 'midterm',
        score: 88,
        totalMarks: 100,
        grade: 'B+',
        teacher: fatma._id,
        recordedBy: admin._id,
        isActive: true
      }
    ];

    await Grade.deleteMany({});
    await Grade.insertMany(grades);
    console.log('Seeded grades:', grades.length);
    process.exit(0);
  } catch (err) {
    console.error('Seeding grades error:', err);
    process.exit(1);
  }
}
seed();