import axios from '../utils/axios';

export const fetchCourses = () => axios.get('/api/courses');
export const createCourse = (data: any) => axios.post('/api/courses', data);
export const updateCourse = (id: string, data: any) => axios.put(`/api/courses/${id}`, data);
export const deleteCourse = (id: string) => axios.delete(`/api/courses/${id}`);
export const fetchCourseStudents = (id: string) => axios.get(`/api/courses/${id}/students`);
export const addStudentToCourse = (id: string, studentId: string) => axios.post(`/api/courses/${id}/students`, { studentId });
export const removeStudentFromCourse = (id: string, studentId: string) => axios.delete(`/api/courses/${id}/students/${studentId}`); 