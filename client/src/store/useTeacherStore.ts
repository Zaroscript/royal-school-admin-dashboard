import {create} from 'zustand';
import { Teacher } from '../types';
import * as teacherService from '../services/teacherService';

interface TeacherState {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
  fetchTeachers: () => Promise<void>;
  createTeacher: (data: any) => Promise<void>;
  updateTeacher: (id: string, data: any) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
}

export const useTeacherStore = create<TeacherState>((set) => ({
  teachers: [],
  loading: false,
  error: null,
  fetchTeachers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await teacherService.fetchTeachers();
      set({ teachers: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  createTeacher: async (teacher) => {
    set({ loading: true, error: null });
    try {
      await teacherService.createTeacher(teacher);
      await useTeacherStore.getState().fetchTeachers();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  updateTeacher: async (id, teacher) => {
    set({ loading: true, error: null });
    try {
      await teacherService.updateTeacher(id, teacher);
      await useTeacherStore.getState().fetchTeachers();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  deleteTeacher: async (id) => {
    set({ loading: true, error: null });
    try {
      await teacherService.deleteTeacher(id);
      await useTeacherStore.getState().fetchTeachers();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
})); 