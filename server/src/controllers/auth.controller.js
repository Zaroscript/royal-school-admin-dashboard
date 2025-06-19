import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { generateResetToken } from "../lib/utils.js";
import { sendResetEmail } from "../lib/sendEmail.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'يرجى إدخال جميع البيانات المطلوبة'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    });
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'البريد الإلكتروني مسجل مسبقاً'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'moderator'
  });

  if (user) {
    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        token
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'بيانات المستخدم غير صحيحة'
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });

  // Validation
  if (!email || !password) {
    console.log('Login failed: missing email or password');
    return res.status(400).json({
      success: false,
      message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
    });
  }

  // Check for user
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    console.log(`Login failed: user not found for email ${email}`);
    return res.status(401).json({
      success: false,
      message: 'بيانات الدخول غير صحيحة'
    });
  }

  console.log('User found:', user.email, '| isActive:', user.isActive, '| password hash:', user.password);

  // Check if user is active
  if (!user.isActive) {
    console.log(`Login failed: user ${email} is not active`);
    return res.status(401).json({
      success: false,
      message: 'الحساب معطل، يرجى التواصل مع الإدارة'
    });
  }

  // Check password
  const isMatch = await user.comparePassword(password);
  console.log('Password match:', isMatch);

  if (!isMatch) {
    console.log(`Login failed: wrong password for user ${email}`);
    return res.status(401).json({
      success: false,
      message: 'بيانات الدخول غير صحيحة'
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'تم تسجيل الدخول بنجاح',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      lastLogin: user.lastLogin,
      token
    }
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'تم تسجيل الخروج بنجاح'
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: user.getPublicProfile()
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, department, position, avatar } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'المستخدم غير موجود'
    });
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (department) user.department = department;
  if (position) user.position = position;
  if (avatar) user.avatar = avatar;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    message: 'تم تحديث الملف الشخصي بنجاح',
    data: updatedUser.getPublicProfile()
  });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'يرجى إدخال كلمة المرور الحالية والجديدة'
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل'
    });
  }

  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'كلمة المرور الحالية غير صحيحة'
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'تم تغيير كلمة المرور بنجاح'
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'يرجى إدخال البريد الإلكتروني'
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'البريد الإلكتروني غير مسجل'
    });
  }

  // Generate reset token
  const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  // TODO: Send email with reset token
  // For now, just return the token (in production, send via email)
  res.status(200).json({
    success: true,
    message: 'تم إرسال رابط إعادة تعيين كلمة المرور',
    data: {
      resetToken: resetToken // Remove this in production
    }
  });
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'يرجى إدخال رمز التأكيد وكلمة المرور الجديدة'
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل'
    });
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'رمز التأكيد غير صحيح أو منتهي الصلاحية'
    });
  }

  // Update password
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'تم إعادة تعيين كلمة المرور بنجاح'
  });
});

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Private
export const refreshToken = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'المستخدم غير موجود'
    });
  }

  // Generate new token
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'تم تجديد الرمز المميز بنجاح',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token
    }
  });
});

// Check authentication status
export const checkAuth = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    message: 'User is authenticated',
    data: user ? user.getPublicProfile() : null
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'المستخدم غير موجود'
    });
  }
  res.status(200).json({
    success: true,
    data: user.getPublicProfile()
  });
});
