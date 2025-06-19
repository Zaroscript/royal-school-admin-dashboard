import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Attendance from '../models/attendance.model.js';
import Student from '../models/student.model.js';
import User from '../models/user.model.js';
dotenv.config({ path: '../../.env' });

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);

    // Find references
    const ali = await Student.findOne({ name: 'Ali Hassan' });
    const sara = await Student.findOne({ name: 'Sara Ahmed' });
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!ali || !sara || !admin) throw new Error('Referenced documents not found. Seed users and students first!');

    const attendance = [
      {
        student: ali._id,
        date: new Date('2024-05-01'),
        status: 'present',
        class: 'الصف الأول الثانوي',
        recordedBy: admin._id
      },
      {
        student: sara._id,
        date: new Date('2024-05-01'),
        status: 'absent',
        class: 'الصف الثاني الثانوي',
        recordedBy: admin._id
      }
    ];

    await Attendance.deleteMany({});
    await Attendance.insertMany(attendance);
    console.log('Seeded attendance:', attendance.length);
    process.exit(0);
  } catch (err) {
    console.error('Seeding attendance error:', err);
    process.exit(1);
  }
}
seed(); 