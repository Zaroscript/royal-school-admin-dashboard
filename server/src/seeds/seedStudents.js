import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../models/student.model.js';

dotenv.config({ path: '../../.env' });

const students = [
  {
    name: 'Ali Hassan',
    grade: 'الصف الأول الثانوي',
    section: 'أ',
    studentId: 'STU2024001',
    parentName: 'Hassan Ali',
    parentPhone: '01000000001',
    address: 'Cairo',
    birthDate: new Date('2008-01-01'),
    email: 'ali.hassan@student.com',
    status: 'نشط',
    isActive: true
  },
  {
    name: 'Sara Ahmed',
    grade: 'الصف الثاني الثانوي',
    section: 'ب',
    studentId: 'STU2024002',
    parentName: 'Ahmed Mostafa',
    parentPhone: '01000000002',
    address: 'Giza',
    birthDate: new Date('2007-05-15'),
    email: 'sara.ahmed@student.com',
    status: 'نشط',
    isActive: true
  }
];

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);
    await Student.deleteMany({});
    await Student.insertMany(students);
    console.log('Seeded students:', students.map(s => s.name));
    process.exit(0);
  } catch (err) {
    console.error('Seeding students error:', err);
    process.exit(1);
  }
}
seed(); 