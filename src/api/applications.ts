// Application API endpoints
// TODO: Replace with real backend API calls

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  driveId: string;
  driveTitle: string;
  company: string;
  collegeId: string;
  collegeName: string;
  status: 'pending' | 'shortlisted' | 'rejected' | 'accepted' | 'interview_scheduled' | 'on_hold';
  appliedAt: string;
  updatedAt: string;
  notes?: string;
  resumeUrl?: string;
  aiScore?: number;
  skillMatch?: number;
  interviewDetails?: {
    date: string;
    time: string;
    mode: 'online' | 'offline' | 'phone';
    link?: string;
    location?: string;
  };
  feedback?: Array<{
    id: string;
    recruiterId: string;
    recruiterName: string;
    rating: number;
    comments: string;
    createdAt: string;
  }>;
}

export interface ApplicationFilters {
  status?: string[];
  company?: string[];
  collegeId?: string;
  driveId?: string;
  studentId?: string;
  search?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface InterviewDetails {
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'phone';
  link?: string;
  location?: string;
}

// TODO: Replace with real backend API call
export async function getApplications(params?: {
  page?: number;
  limit?: number;
  filters?: ApplicationFilters;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): Promise<{ data: Application[] }> {
  // Implementation will be:
  // const queryParams = new URLSearchParams(params as any).toString();
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/applications?${queryParams}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function getApplicationById(applicationId: string): Promise<Application> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${applicationId}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function createApplication(data: {
  studentId: string;
  driveId: string;
  collegeId: string;
}): Promise<Application> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
  //   method: 'POST',
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
export async function updateApplicationStatus(applicationId: string, status: Application['status'], notes?: string): Promise<Application> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${applicationId}/status`, {
  //   method: 'PUT',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify({ status, notes })
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function scheduleInterview(applicationId: string, interviewDetails: InterviewDetails): Promise<Application> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${applicationId}/interview`, {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify(interviewDetails)
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function addApplicationFeedback(applicationId: string, feedback: {
  rating: number;
  comments: string;
}): Promise<Application> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/${applicationId}/feedback`, {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   },
  //   body: JSON.stringify(feedback)
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function getApplicationStatistics(filters?: {
  collegeId?: string;
  driveId?: string;
  companyId?: string;
}): Promise<{
  totalApplications: number;
  pending: number;
  shortlisted: number;
  rejected: number;
  accepted: number;
  interviewScheduled: number;
  onHold: number;
}> {
  // Implementation will be:
  // const queryParams = new URLSearchParams(filters as any).toString();
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/applications/statistics?${queryParams}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}
