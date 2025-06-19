import {create} from 'zustand';
import { Student } from '../types';
import * as studentService from '../services/studentService';

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  hasMore: boolean;
  fetchStudents: (reset?: boolean) => Promise<void>;
  loadMoreStudents: () => Promise<void>;
  createStudent: (data: any) => Promise<void>;
  updateStudent: (id: string, data: any) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  forceDeleteStudent: (id: string) => Promise<void>;
}

const PAGE_SIZE = 20;

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  hasMore: true,
  fetchStudents: async (reset = true) => {
    set({ loading: true, error: null });
    try {
      const page = reset ? 1 : get().page;
      const { data } = await studentService.fetchStudents(page, PAGE_SIZE);
      const students = data.data.map((student: any) => ({ ...student, id: student._id }));
      set({
        students: reset ? students : [...get().students, ...students],
        loading: false,
        total: data.pagination.total,
        page,
        hasMore: page < data.pagination.pages
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  loadMoreStudents: async () => {
    const { page, hasMore, loading } = get();
    if (!hasMore || loading) return;
    set({ loading: true });
    try {
      const nextPage = page + 1;
      const { data } = await studentService.fetchStudents(nextPage, PAGE_SIZE);
      const students = data.data.map((student: any) => ({ ...student, id: student._id }));
      set({
        students: [...get().students, ...students],
        loading: false,
        total: data.pagination.total,
        page: nextPage,
        hasMore: nextPage < data.pagination.pages
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  createStudent: async (student) => {
    set({ loading: true, error: null });
    try {
      await studentService.createStudent(student);
      await get().fetchStudents();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  updateStudent: async (id, student) => {
    set({ loading: true, error: null });
    try {
      await studentService.updateStudent(id, student);
      await get().fetchStudents();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  deleteStudent: async (id) => {
    set({ loading: true, error: null });
    try {
      await studentService.deleteStudent(id);
      await get().fetchStudents();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  forceDeleteStudent: async (id) => {
    set({ loading: true, error: null });
    try {
      await studentService.forceDeleteStudent(id);
      await get().fetchStudents();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
})); 