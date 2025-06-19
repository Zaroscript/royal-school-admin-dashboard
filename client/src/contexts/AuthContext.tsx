import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export type UserRole = 'admin' | 'moderator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login: loginStore, logout: logoutStore, loading: isLoading, fetchProfile } = useAuthStore();

  useEffect(() => {
    // Check for saved token and fetch profile
    const token = localStorage.getItem('token');
    if (token && !user) {
      fetchProfile();
    }
  }, [fetchProfile, user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await loginStore(email, password);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    logoutStore();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
