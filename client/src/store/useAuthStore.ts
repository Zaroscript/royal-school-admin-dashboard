import {create} from 'zustand';
import * as authService from '../services/authService';
import { encryptData, decryptData } from '@/lib/utils';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

function loadUser() {
  try {
    const cipher = localStorage.getItem('user');
    return cipher ? decryptData(cipher) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: loadUser(),
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await authService.login(email, password);
      set({ user: data.data, loading: false });
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', encryptData(data.data));
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Login failed', loading: false, user: null });
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
      set({ user: null, loading: false });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Logout failed', loading: false });
    }
  },
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await authService.getProfile();
      set({ user: data.data, loading: false });
      localStorage.setItem('user', encryptData(data.data));
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch profile', loading: false });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ user: null });
    }
  },
})); 