import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

dotenv.config({ path: '../../.env' });

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 12),
    role: 'admin',
    phone: '1234567890',
    department: 'Administration',
    position: 'System Admin',
    isActive: true,
  },
  {
    name: 'Moderator User',
    email: 'moderator@example.com',
    password: await bcrypt.hash('moderator123', 12),
    role: 'moderator',
    phone: '0987654321',
    department: 'Moderation',
    position: 'Content Moderator',
    isActive: true,
  }
];

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Seeded users:', users.map(u => u.email));
    process.exit(0);
  } catch (err) {
    console.error('Seeding users error:', err);
    process.exit(1);
  }
}
seed();