export interface Course {
  _id: string;
  name: string;
  code: string;
  description?: string;
  teacher?: string | Teacher;
  grade?: string;
  credits?: number;
  maxStudents?: number;
  schedule?: string;
  classroom?: string;
  students?: string[] | Student[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Teacher {
  _id: string;
  name: string;
  teacherId: string;
}

export interface Student {
  _id: string;
  name: string;
  studentId: string;
} 