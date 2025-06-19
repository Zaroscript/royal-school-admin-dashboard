import axios from '../utils/axios';

export const fetchTeachers = () => axios.get('/api/teachers');
export const createTeacher = (data: any) => axios.post('/api/teachers', data);
export const updateTeacher = (id: string, data: any) => axios.put(`/api/teachers/${id}`, data);
export const deleteTeacher = (id: string) => axios.delete(`/api/teachers/${id}`);
export const fetchTeacherProfile = (id: string) => axios.get(`/api/teachers/${id}/profile`);
export const fetchTeacherCourses = (id: string) => axios.get(`/api/teachers/${id}/courses`); 