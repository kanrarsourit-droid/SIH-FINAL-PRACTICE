import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  currentStream: string;
  setStream: (stream: string) => void;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pathpilot_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_demo_active',
      email: 'student@sih-pathpilot.ai',
      full_name: 'PathPilot Scholar',
      role: 'student',
      current_stream: 'Computer Science & IT',
      target_role: 'AI Architect'
    };
  });

  const [currentStream, setCurrentStream] = useState<string>(() => {
    return user?.current_stream || 'Computer Science & IT';
  });

  const setStream = (stream: string) => {
    setCurrentStream(stream);
    if (user) {
      const updated = { ...user, current_stream: stream };
      setUser(updated);
      localStorage.setItem('pathpilot_user', JSON.stringify(updated));
    }
  };

  const login = async (credentials: any) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    if (data.user?.current_stream) {
      setCurrentStream(data.user.current_stream);
    }
  };

  const logout = () => {
    localStorage.removeItem('pathpilot_token');
    localStorage.removeItem('pathpilot_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      currentStream,
      setStream,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
