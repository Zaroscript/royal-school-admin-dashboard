export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  studentId: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  parentName: string;
  parentPhone: string;
  address: string;
  email: string;
  avatar?: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
  behavior: {
    warnings: number;
    commendations: number;
    notes: string[];
  };
  health: {
    bloodType: string;
    allergies: string[];
    medications: string[];
    emergencyContact: string;
  };
  academicRecord: {
    gpa: number;
    rank: number;
    subjects: {
      [key: string]: {
        grade: number;
        teacher: string;
        attendance: number;
      };
    };
  };
  extracurricular: {
    activities: string[];
    clubs: string[];
    achievements: string[];
  };
  financialStatus: {
    tuitionPaid: boolean;
    lastPaymentDate: string;
    outstandingBalance: number;
    scholarshipStatus?: string;
  };
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  schedule: {
    [key: string]: {
      time: string;
      class: string;
      subject: string;
    }[];
  };
  qualifications: string[];
  joinDate: string;
  avatar?: string;
  status: 'active' | 'on-leave' | 'inactive';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  grade: string;
  teacher: string;
  description: string;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  students: string[];
  materials: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  time?: string;
  notes?: string;
  class: string;
  subject: string;
  recordedBy: string;
}

export interface Exam {
  id: string;
  subject: string;
  class: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  teacher: string;
  type: 'quiz' | 'midterm' | 'final' | 'assignment';
  totalMarks: number;
  results?: {
    studentId: string;
    marks: number;
    grade: string;
    feedback?: string;
  }[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  copies: number;
  availableCopies: number;
  location: string;
  borrowHistory: {
    studentId: string;
    checkoutDate: string;
    dueDate: string;
    returnDate?: string;
    status: 'borrowed' | 'returned' | 'overdue';
  }[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'meeting' | 'activity' | 'holiday' | 'exam';
  organizer: string;
  attendees: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  examId: string;
  marks: number;
  totalMarks: number;
  grade: string;
  semester: string;
  academicYear: string;
  teacher: string;
  date: string;
  feedback?: string;
}

export type CasePriority = 'low' | 'medium' | 'high' | 'urgent';
export type CaseStatus = 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed';
export type CaseType = 'behavioral' | 'academic' | 'attendance' | 'health' | 'family' | 'other';

export interface CaseAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface CaseComment {
  id: string;
  text: string;
  createdAt: string;
  createdBy: string;
  isPrivate: boolean;
}

export interface CaseHistory {
  id: string;
  timestamp: string;
  action: string;  oldValue?: unknown;
  newValue?: unknown;
  performedBy: string;
}

export interface StudentAffairsCase {
  id: string;
  studentId: string;
  title: string;
  description: string;
  type: CaseType;
  priority: CasePriority;
  status: CaseStatus;
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  dueDate?: string;
  tags: string[];
  attachments: CaseAttachment[];
  comments: CaseComment[];
  history: CaseHistory[];
  relatedCases: string[];
  actionPlan?: string;
  followUpDate?: string;
  confidentialityLevel: 'normal' | 'sensitive' | 'highly-sensitive';
  metrics: {
    daysOpen: number;
    responseTime: number;
    totalComments: number;
    totalAttachments: number;
  };
}
