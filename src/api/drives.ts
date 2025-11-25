// Drive API endpoints
// TODO: Replace with real backend API calls

export interface Drive {
  id: string;
  title: string;
  description: string;
  company: string;
  companyId: string;
  location: string;
  type: 'on-campus' | 'virtual' | 'off-campus';
  eligibility: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  deadline: string;
  driveDate: string;
  status: 'active' | 'closed' | 'draft';
  requirements: string[];
  benefits: string[];
  process: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  applicantsCount: number;
  selectedCount: number;
}

export interface DriveFilters {
  company?: string[];
  type?: string[];
  location?: string[];
  status?: string[];
  deadline?: string;
  search?: string;
}

// TODO: Replace with real backend API call
export async function getDrives(params?: {
  page?: number;
  limit?: number;
  collegeId?: string;
  filters?: DriveFilters;
}): Promise<{ data: Drive[] }> {
  // Implementation will be:
  // const queryParams = new URLSearchParams(params as any).toString();
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/drives?${queryParams}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function getDriveById(driveId: string): Promise<Drive> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/drives/${driveId}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function getUpcomingDrives(limit?: number, collegeId?: string): Promise<Drive[]> {
  // Implementation will be:
  // const queryParams = new URLSearchParams({ limit: limit?.toString(), collegeId: collegeId || '' }).toString();
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/drives/upcoming?${queryParams}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function searchDrives(query: string, collegeId?: string): Promise<{ data: Drive[] }> {
  // Implementation will be:
  // const queryParams = new URLSearchParams({ q: query, collegeId: collegeId || '' }).toString();
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/drives/search?${queryParams}`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}

// TODO: Replace with real backend API call
export async function getDriveStatistics(driveId: string): Promise<{
  totalApplicants: number;
  shortlisted: number;
  interviewScheduled: number;
  accepted: number;
  rejected: number;
  onHold: number;
}> {
  // Implementation will be:
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/drives/${driveId}/statistics`, {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return response.json();
  throw new Error('Not implemented - use mock data for now');
}
