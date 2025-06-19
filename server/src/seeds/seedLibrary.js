import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Library from '../models/library.model.js';
import User from '../models/user.model.js';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);

    // Find admin user
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) throw new Error('Admin user not found. Seed users first!');

    const books = [
      {
        title: 'مقدمة في الجبر',
        author: 'John Smith',
        isbn: '978-3-16-148410-0',
        category: 'رياضيات',
        totalCopies: 10,
        availableCopies: 8,
        borrowedCopies: 2,
        status: 'available',
        isActive: true,
        addedBy: admin._id
      },
      {
        title: 'الفيزياء للمبتدئين',
        author: 'Jane Doe',
        isbn: '978-1-23-456789-7',
        category: 'علوم',
        totalCopies: 5,
        availableCopies: 5,
        borrowedCopies: 0,
        status: 'available',
        isActive: true,
        addedBy: admin._id
      }
    ];

    await Library.deleteMany({});
    await Library.insertMany(books);
    console.log('Seeded library books:', books.length);
    process.exit(0);
  } catch (err) {
    console.error('Seeding library error:', err);
    process.exit(1);
  }
}
seed(); 