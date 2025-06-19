import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import studentRoutes from './routes/student.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import courseRoutes from './routes/course.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import examRoutes from './routes/exam.routes.js';
import gradeRoutes from './routes/grade.routes.js';
import financeRoutes from './routes/finance.routes.js';
import eventRoutes from './routes/event.routes.js';
import libraryRoutes from './routes/library.routes.js';
import documentRoutes from './routes/document.routes.js';
import scheduleRoutes from './routes/schedule.routes.js';
import reportRoutes from './routes/report.routes.js';

// Import middleware
import { errorHandler } from './middleware/error.middleware.js';
import { authMiddleware } from './middleware/auth.middleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Royal School Admin API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/students', authMiddleware, studentRoutes);
app.use('/api/teachers', authMiddleware, teacherRoutes);
app.use('/api/courses', authMiddleware, courseRoutes);
app.use('/api/attendance', authMiddleware, attendanceRoutes);
app.use('/api/exams', authMiddleware, examRoutes);
app.use('/api/grades', authMiddleware, gradeRoutes);
app.use('/api/finance', authMiddleware, financeRoutes);
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/api/library', authMiddleware, libraryRoutes);
app.use('/api/documents', authMiddleware, documentRoutes);
app.use('/api/schedule', authMiddleware, scheduleRoutes);
app.use('/api/reports', authMiddleware, reportRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} | body:`, req.body);
  next();
});

// Error handling middleware
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Royal School Admin API running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });
};

startServer();

export default app;