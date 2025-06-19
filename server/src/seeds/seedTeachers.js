import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Teacher from '../models/teacher.model.js';
dotenv.config({ path: '../../.env' });
const teachers = [
  {
    name: 'Mohamed Salah',
    email: 'm.salah@school.com',
    phone: '01111111111',
    subject: 'Mathematics',
    experience: 5,
    status: 'active',
    isActive: true
  },
  {
    name: 'Fatma Youssef',
    email: 'f.youssef@school.com',
    phone: '01111111112',
    subject: 'Physics',
    experience: 8,
    status: 'active',
    isActive: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await Teacher.deleteMany({});
    await Teacher.insertMany(teachers);
    console.log('Seeded teachers:', teachers.map(t => t.name));
    process.exit(0);
  } catch (err) {
    console.error('Seeding teachers error:', err);
    process.exit(1);
  }
}
seed(); 