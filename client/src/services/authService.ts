import axios from '@/utils/axios';

export const login = (email: string, password: string) => {
  return axios.post('/api/auth/login', { email, password });
};

export const logout = () => {
  return axios.post('/api/auth/logout');
};

export const getProfile = () => {
  return axios.get('/api/auth/profile');
}; 