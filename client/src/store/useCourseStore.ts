import {create} from 'zustand';
import { Course } from '../types';
import * as courseService from '../services/courseService';

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  createCourse: (data: any) => Promise<void>;
  updateCourse: (id: string, data: any) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  loading: false,
  error: null,
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await courseService.fetchCourses();
      const courses = data.data.map((course: any) => ({ ...course, id: course._id }));
      set({ courses, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  createCourse: async (course) => {
    set({ loading: true, error: null });
    try {
      await courseService.createCourse(course);
      await useCourseStore.getState().fetchCourses();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  updateCourse: async (id, course) => {
    set({ loading: true, error: null });
    try {
      await courseService.updateCourse(id, course);
      await useCourseStore.getState().fetchCourses();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
  deleteCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      await courseService.deleteCourse(id);
      await useCourseStore.getState().fetchCourses();
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Error', loading: false });
    }
  },
})); 