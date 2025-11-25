// Authentication API endpoints
// TODO: Replace with real backend API calls

export interface LoginRequest {
  email: string;
  password: string;
  role: 'student' | 'college' | 'recruiter';
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'college' | 'recruiter';
  collegeId?: string;
  [key: string]: any;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    collegeId?: string;
  };
  token: string;
}

// TODO: Replace with real backend API call
export async function login(data: LoginRequest): Promise<AuthResponse> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function signup(data: SignupRequest): Promise<AuthResponse> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data)
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function logout(token: string): Promise<void> {
  // Implementation will be:
  // await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // });
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function refreshToken(refreshToken: string): Promise<AuthResponse> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ refreshToken })
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}
