import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Event from '../models/event.model.js';
import User from '../models/user.model.js';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

async function seed() {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL is not defined in .env');
    await mongoose.connect(process.env.MONGODB_URL);

    // Find admin user
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) throw new Error('Admin user not found. Seed users first!');

    const events = [
      {
        title: 'اجتماع أولياء الأمور',
        description: 'اجتماع لمناقشة أداء الطلاب وخطط المدرسة.',
        date: new Date('2024-06-01'),
        time: '10:00',
        type: 'meeting', // valid enum value
        location: 'قاعة الاجتماعات',
        organizer: admin._id,
        status: 'published', // valid enum value
        isActive: true
      },
      {
        title: 'ورشة عمل الفيزياء',
        description: 'ورشة عمل تطبيقية لطلاب الصف الثاني الثانوي.',
        date: new Date('2024-06-15'),
        time: '12:00',
        type: 'workshop', // valid enum value
        location: 'معمل الفيزياء',
        organizer: admin._id,
        status: 'published', // valid enum value
        isActive: true
      }
    ];

    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log('Seeded events:', events.length);
    process.exit(0);
  } catch (err) {
    console.error('Seeding events error:', err);
    process.exit(1);
  }
}
seed();