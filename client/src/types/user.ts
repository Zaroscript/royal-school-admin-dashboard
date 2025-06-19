export type UserRole = 'admin' | 'moderator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
} 