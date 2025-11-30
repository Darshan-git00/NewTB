import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiClient, ApiError } from '@/services/api';

export type UserRole = 'student' | 'college' | 'recruiter';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  collegeId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (userData: any, role: UserRole) => Promise<{ success: boolean; collegeId?: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('talentbridge_token');
    const storedUser = localStorage.getItem('talentbridge_user');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Ensure role matches UserRole type
        const userWithCorrectRole = {
          ...userData,
          role: userData.role as UserRole
        };
        setUser(userWithCorrectRole);
        setToken(storedToken);
      } catch (error) {
        console.error('AuthContext - Failed to parse stored user data:', error);
        localStorage.removeItem('talentbridge_token');
        localStorage.removeItem('talentbridge_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Real authentication functions
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await apiClient.post<{ user: User; token: string }>('/auth/login', {
        email,
        password,
        role
      });

      if (response.success && response.data) {
        const { user: userData, token } = response.data;
        
        setUser(userData);
        setToken(token);
        localStorage.setItem('talentbridge_token', token);
        localStorage.setItem('talentbridge_user', JSON.stringify(userData));
        
        // Redirect to appropriate dashboard
        const dashboardRoutes = {
          student: '/student/dashboard',
          college: '/college/dashboard',
          recruiter: '/recruiter/dashboard'
        };
        
        navigate(dashboardRoutes[role]);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof ApiError) {
        // You could show a toast notification here with error.message
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any, role: UserRole): Promise<{ success: boolean; collegeId?: string }> => {
    setIsLoading(true);
    
    try {
      const response = await apiClient.post<{ user: User; token: string }>('/auth/signup', {
        ...userData,
        role
      });

      if (response.success && response.data) {
        const { user: newUser, token } = response.data;
        
        setUser(newUser);
        setToken(token);
        localStorage.setItem('talentbridge_token', token);
        localStorage.setItem('talentbridge_user', JSON.stringify(newUser));
        
        // For college signup, return success with college ID (don't auto-navigate)
        if (role === 'college') {
          setIsLoading(false);
          return { success: true, collegeId: newUser.collegeId };
        }
        
        // For other roles, auto-navigate to dashboard
        const dashboardRoutes = {
          student: '/student/dashboard',
          recruiter: '/recruiter/dashboard'
        };
        
        navigate(dashboardRoutes[role]);
        return { success: true, collegeId: newUser.collegeId };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof ApiError) {
        // You could show a toast notification here with error.message
      }
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('talentbridge_token');
    localStorage.removeItem('talentbridge_user');
    navigate('/');
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      signup,
      logout,
      isLoading,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};
