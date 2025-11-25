// Student API endpoints
// TODO: Replace with real backend API calls

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  collegeId: string;
  collegeName: string;
  course: string;
  branch: string;
  year: string;
  cgpa: number;
  skills: string[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    year: string;
    credentialId?: string;
    credentialUrl?: string;
  }>;
  aiInterviewScore: number;
  skillMatchPercentage: number;
  projectExperience: number;
  customRank: number;
  status: string;
}

export interface StudentFilters {
  skills?: string[];
  certifications?: string[];
  minAIScore?: number;
  maxAIScore?: number;
  branch?: string[];
  year?: string[];
  status?: string[];
  minProjectExperience?: number;
  minSkillMatch?: number;
  customRank?: string[] | 'topN';
}

// TODO: Replace with real backend API call
export async function getStudentProfile(studentId: string): Promise<StudentProfile> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${studentId}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function updateStudentProfile(studentId: string, data: Partial<StudentProfile>): Promise<StudentProfile> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${studentId}`, {
  //   method: 'PUT',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify(data)
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function getFilteredStudents(collegeId: string, filters: StudentFilters): Promise<{ data: StudentProfile[] }> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/colleges/${collegeId}/students/filter`, {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify(filters)
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function uploadResume(studentId: string, file: File): Promise<{ url: string }> {
  // Implementation will be:
  // const formData = new FormData();
  // formData.append('resume', file);
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/students/${studentId}/resume`, {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${token}` },
  //   body: formData
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}
