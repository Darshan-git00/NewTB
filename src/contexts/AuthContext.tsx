import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveCollege, saveStudent, saveRecruiter } from '@/lib/authStorage';

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
        setUser(userData);
        setToken(storedToken);
      } catch (error) {
        console.error('AuthContext - Failed to parse stored user data:', error);
        localStorage.removeItem('talentbridge_token');
        localStorage.removeItem('talentbridge_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock authentication functions
  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - in real app, this would be an API call
    const mockUsers = {
      student: [
        { id: 'student_1', name: 'John Doe', email: 'student@talentbridge.com', password: 'password123', collegeId: 'MIT-ABC123' },
        { id: 'student_2', name: 'Jane Smith', email: 'jane@talentbridge.com', password: 'password123', collegeId: 'STA-DEF456' }
      ],
      college: [
        { id: 'college_1', name: 'MIT College', email: 'college@talentbridge.com', password: 'password123', collegeId: 'MIT-ABC123' },
        { id: 'college_2', name: 'Stanford University', email: 'stanford@talentbridge.com', password: 'password123', collegeId: 'STA-DEF456' }
      ],
      recruiter: [
        { id: 'recruiter_1', name: 'Google HR', email: 'recruiter@talentbridge.com', password: 'password123', collegeId: 'MIT-ABC123' },
        { id: 'recruiter_2', name: 'Microsoft Talent', email: 'microsoft@talentbridge.com', password: 'password123', collegeId: 'STA-DEF456' }
      ]
    };

    const users = mockUsers[role];
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const userData = { ...userWithoutPassword, role };
      const mockToken = `mock_token_${Date.now()}_${userData.id}`;
      
      setUser(userData);
      setToken(mockToken);
      localStorage.setItem('talentbridge_token', mockToken);
      localStorage.setItem('talentbridge_user', JSON.stringify(userData));
      
      // Redirect to appropriate dashboard
      const dashboardRoutes = {
        student: '/student/dashboard',
        college: '/college/dashboard',
        recruiter: '/recruiter/dashboard'
      };
      
      navigate(dashboardRoutes[role]);
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const signup = async (userData: any, role: UserRole): Promise<{ success: boolean; collegeId?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      let newUser;
      let collegeId: string | undefined;

      switch (role) {
        case 'college':
          const savedCollege = saveCollege(userData);
          collegeId = savedCollege.collegeId;
          newUser = {
            id: savedCollege.id,
            name: savedCollege.name,
            email: savedCollege.email,
            role,
            collegeId
          };
          break;
        case 'student':
          const savedStudent = saveStudent(userData);
          newUser = {
            id: savedStudent.id,
            name: savedStudent.name,
            email: savedStudent.email,
            role,
            collegeId: userData.collegeId
          };
          break;
        case 'recruiter':
          const savedRecruiter = saveRecruiter(userData);
          newUser = {
            id: savedRecruiter.id,
            name: savedRecruiter.name,
            email: savedRecruiter.email,
            role,
            collegeId: userData.collegeId
          };
          break;
        default:
          setIsLoading(false);
          return { success: false };
      }

      const mockToken = `mock_token_${Date.now()}_${newUser.id}`;
      
      setUser(newUser);
      setToken(mockToken);
      localStorage.setItem('talentbridge_token', mockToken);
      localStorage.setItem('talentbridge_user', JSON.stringify(newUser));
      
      // For college signup, return success with college ID (don't auto-navigate)
      if (role === 'college') {
        setIsLoading(false);
        return { success: true, collegeId };
      }
      
      // For other roles, auto-navigate to dashboard
      const dashboardRoutes = {
        student: '/student/dashboard',
        college: '/college/dashboard',
        recruiter: '/recruiter/dashboard'
      };
      
      navigate(dashboardRoutes[role]);
      return { success: true };
      
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return { success: false };
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
