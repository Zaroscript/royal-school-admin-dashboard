import axios from '../utils/axios';

export const fetchStudents = (page = 1, limit = 20, filters = {}) => {
  const params = { page, limit, ...filters };
  return axios.get('/api/students', { params });
};
export const createStudent = (data: any) => axios.post('/api/students', data);
export const updateStudent = (id: string, data: any) => axios.put(`/api/students/${id}`, data);
export const deleteStudent = (id: string) => axios.delete(`/api/students/${id}`);
export const forceDeleteStudent = (id: string) => axios.delete(`/api/students/${id}/force`);
export const fetchStudentProfile = (id: string) => axios.get(`/api/students/${id}/profile`);
export const fetchStudentAttendance = (id: string) => axios.get(`/api/students/${id}/attendance`);
export const fetchStudentGrades = (id: string) => axios.get(`/api/students/${id}/grades`);
export const fetchStudentCourses = (id: string) => axios.get(`/api/students/${id}/courses`); 