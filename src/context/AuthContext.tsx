import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role?: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@quiz.com',
    role: 'admin',
    full_name: 'Quiz Admin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'user-1',
    email: 'user@quiz.com',
    role: 'user',
    full_name: 'John Doe',
    created_at: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('quiz-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Mock login - in real app, this would call Supabase auth
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('quiz-user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const register = async (email: string, password: string, fullName: string, role: 'user' | 'admin' = 'user') => {
    setLoading(true);
    
    // Mock registration - in real app, this would call Supabase auth
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      role,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('quiz-user', JSON.stringify(newUser));
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quiz-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};