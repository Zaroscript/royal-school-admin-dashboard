import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Document from '../models/document.model.js';
import User from '../models/user.model.js';
dotenv.config({ path: '../../.env' });
const documents = [
  {
    name: 'School Policy',
    originalName: 'school_policy.pdf',
    type: 'pdf',
    size: 102400, // 100 KB
    url: 'https://example.com/files/school_policy.pdf',
    category: 'policies', // valid enum value
    uploadedBy: null, // to be set after fetching admin
    status: 'active',
    isActive: true
  },
  {
    name: 'Exam Schedule',
    originalName: 'exam_schedule.pdf',
    type: 'pdf',
    size: 204800, // 200 KB
    url: 'https://example.com/files/exam_schedule.pdf',
    category: 'schedules', // valid enum value
    uploadedBy: null, // to be set after fetching admin
    status: 'active',
    isActive: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    // Find admin user
    const admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) throw new Error('Admin user not found. Seed users first!');
    // Set uploadedBy to admin's ObjectId
    documents.forEach(doc => { doc.uploadedBy = admin._id; });
    await Document.deleteMany({});
    await Document.insertMany(documents);
    console.log('Seeded documents:', documents.map(d => d.name));
    process.exit(0);
  } catch (err) {
    console.error('Seeding documents error:', err);
    process.exit(1);
  }
}
seed(); 