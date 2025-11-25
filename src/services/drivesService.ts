import { ApiResponse, createMockApiCall } from './api';
import { Drive, Application, PaginatedResponse, PaginationParams } from './types';

// Mock drives data (shared with student service but managed separately here)
const mockDrives: Drive[] = [
  {
    id: 'drive_1',
    title: 'Software Engineer Intern',
    description: 'Looking for talented software engineering interns for summer 2024',
    company: 'Google',
    companyId: 'company_1',
    location: 'Bangalore',
    type: 'on-campus',
    eligibility: ['B.Tech', 'M.Tech', 'CGPA >= 7.0'],
    salary: { min: 80000, max: 120000, currency: 'USD' },
    deadline: '2024-02-15T23:59:59Z',
    driveDate: '2024-03-01T09:00:00Z',
    status: 'active',
    requirements: ['Strong programming skills', 'Problem solving ability', 'Good communication'],
    benefits: ['Health insurance', 'Mentorship program', 'Flexible work hours'],
    process: ['Online Test', 'Technical Interview', 'HR Interview'],
    createdBy: 'recruiter_1',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    applicantsCount: 245,
    selectedCount: 12
  },
  {
    id: 'drive_2',
    title: 'Frontend Developer',
    description: 'Join our frontend team to build amazing user experiences',
    company: 'Microsoft',
    companyId: 'company_2',
    location: 'Remote',
    type: 'virtual',
    eligibility: ['B.Tech', 'MCA', 'Experience with React'],
    salary: { min: 70000, max: 100000, currency: 'USD' },
    deadline: '2024-02-20T23:59:59Z',
    driveDate: '2024-03-05T10:00:00Z',
    status: 'active',
    requirements: ['React expertise', 'TypeScript knowledge', 'UI/UX understanding'],
    benefits: ['Remote work', 'Stock options', 'Learning budget'],
    process: ['Coding Challenge', 'System Design', 'Cultural Fit'],
    createdBy: 'recruiter_2',
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    applicantsCount: 189,
    selectedCount: 8
  },
  {
    id: 'drive_3',
    title: 'Data Science Intern',
    description: 'Exciting opportunity for data science enthusiasts to work on real-world problems',
    company: 'Amazon',
    companyId: 'company_3',
    location: 'Seattle',
    type: 'off-campus',
    eligibility: ['B.Tech', 'M.Tech', 'M.Sc', 'Strong math background'],
    salary: { min: 90000, max: 130000, currency: 'USD' },
    deadline: '2024-02-10T23:59:59Z',
    driveDate: '2024-02-25T09:00:00Z',
    status: 'active',
    requirements: ['Python expertise', 'Machine Learning knowledge', 'Statistics background'],
    benefits: ['Relocation assistance', 'Housing stipend', 'Career development program'],
    process: ['Online Assessment', 'Technical Interview', 'Case Study', 'Final Interview'],
    createdBy: 'recruiter_3',
    createdAt: '2024-01-08T13:00:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    applicantsCount: 312,
    selectedCount: 15
  },
  {
    id: 'drive_4',
    title: 'Product Manager Intern',
    description: 'Join our product team to help shape the future of technology',
    company: 'Meta',
    companyId: 'company_4',
    location: 'Menlo Park',
    type: 'on-campus',
    eligibility: ['MBA', 'B.Tech + MBA', 'Product experience'],
    salary: { min: 110000, max: 150000, currency: 'USD' },
    deadline: '2024-02-25T23:59:59Z',
    driveDate: '2024-03-10T10:00:00Z',
    status: 'draft',
    requirements: ['Product thinking', 'Analytical skills', 'Communication skills'],
    benefits: ['Free meals', 'Gym access', 'Transportation'],
    process: ['Resume Screening', 'Case Study', 'Multiple Interviews'],
    createdBy: 'recruiter_4',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-22T14:30:00Z',
    applicantsCount: 0,
    selectedCount: 0
  }
];

// Mock applications for drives
const mockApplications: Application[] = [
  {
    id: 'app_1',
    studentId: 'student_1',
    driveId: 'drive_1',
    driveTitle: 'Software Engineer Intern',
    company: 'Google',
    status: 'under_review',
    appliedAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
    currentRound: 'Technical Interview',
    nextRound: 'HR Interview'
  },
  {
    id: 'app_2',
    studentId: 'student_2',
    driveId: 'drive_1',
    driveTitle: 'Software Engineer Intern',
    company: 'Google',
    status: 'shortlisted',
    appliedAt: '2024-01-09T15:45:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
    currentRound: 'HR Interview',
    nextRound: 'Final Round'
  },
  {
    id: 'app_3',
    studentId: 'student_1',
    driveId: 'drive_2',
    driveTitle: 'Frontend Developer',
    company: 'Microsoft',
    status: 'applied',
    appliedAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z'
  }
];

// Drives service functions
export const drivesService = {
  // Get all drives with filtering and pagination
  getDrives: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    type?: string;
    location?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Drive>>> => {
    let filteredDrives = [...mockDrives];

    // Apply filters
    if (params?.status) {
      filteredDrives = filteredDrives.filter(drive => drive.status === params.status);
    }

    if (params?.type) {
      filteredDrives = filteredDrives.filter(drive => drive.type === params.type);
    }

    if (params?.location) {
      filteredDrives = filteredDrives.filter(drive => 
        drive.location.toLowerCase().includes(params.location!.toLowerCase())
      );
    }

    if (params?.search) {
      filteredDrives = filteredDrives.filter(drive => 
        drive.title.toLowerCase().includes(params.search!.toLowerCase()) ||
        drive.company.toLowerCase().includes(params.search!.toLowerCase()) ||
        drive.description.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    // Apply sorting
    if (params?.sortBy) {
      filteredDrives.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Drive];
        const bValue = b[params.sortBy as keyof Drive];
        
        // Handle undefined values safely
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return params.sortOrder === 'desc' ? -1 : 1;
        if (bValue === undefined) return params.sortOrder === 'desc' ? 1 : -1;
        
        if (aValue < bValue) return params.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return params.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedDrives = filteredDrives.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedDrives,
      pagination: {
        page,
        limit,
        total: filteredDrives.length,
        totalPages: Math.ceil(filteredDrives.length / limit),
        hasNext: endIndex < filteredDrives.length,
        hasPrev: page > 1
      }
    })();
  },

  // Get drive by ID
  getDriveById: async (driveId: string): Promise<ApiResponse<Drive>> => {
    const drive = mockDrives.find(d => d.id === driveId);
    if (!drive) {
      throw new Error('Drive not found');
    }
    return createMockApiCall(drive)();
  },

  // Create new drive
  createDrive: async (driveData: Omit<Drive, 'id' | 'createdAt' | 'updatedAt' | 'applicantsCount' | 'selectedCount'>): Promise<ApiResponse<Drive>> => {
    const newDrive: Drive = {
      ...driveData,
      id: `drive_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicantsCount: 0,
      selectedCount: 0
    };

    mockDrives.push(newDrive);
    return createMockApiCall(newDrive)();
  },

  // Update drive
  updateDrive: async (driveId: string, driveData: Partial<Drive>): Promise<ApiResponse<Drive>> => {
    const driveIndex = mockDrives.findIndex(d => d.id === driveId);
    if (driveIndex === -1) {
      throw new Error('Drive not found');
    }

    const updatedDrive = { 
      ...mockDrives[driveIndex], 
      ...driveData, 
      updatedAt: new Date().toISOString() 
    };
    
    mockDrives[driveIndex] = updatedDrive;
    return createMockApiCall(updatedDrive)();
  },

  // Delete drive
  deleteDrive: async (driveId: string): Promise<ApiResponse<void>> => {
    const driveIndex = mockDrives.findIndex(d => d.id === driveId);
    if (driveIndex === -1) {
      throw new Error('Drive not found');
    }

    mockDrives.splice(driveIndex, 1);
    return createMockApiCall(undefined)();
  },

  // Get applications for a specific drive
  getDriveApplications: async (driveId: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Application>>> => {
    let driveApplications = mockApplications.filter(app => app.driveId === driveId);

    if (params?.search) {
      driveApplications = driveApplications.filter(app =>
        app.driveTitle.toLowerCase().includes(params.search!.toLowerCase()) ||
        app.company.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedApplications = driveApplications.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedApplications,
      pagination: {
        page,
        limit,
        total: driveApplications.length,
        totalPages: Math.ceil(driveApplications.length / limit),
        hasNext: endIndex < driveApplications.length,
        hasPrev: page > 1
      }
    })();
  },

  // Update application status
  updateApplicationStatus: async (applicationId: string, status: Application['status'], notes?: string): Promise<ApiResponse<Application>> => {
    const appIndex = mockApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      throw new Error('Application not found');
    }

    const updatedApplication = { 
      ...mockApplications[appIndex], 
      status,
      notes,
      updatedAt: new Date().toISOString() 
    };
    
    mockApplications[appIndex] = updatedApplication;
    return createMockApiCall(updatedApplication)();
  },

  // Get drive statistics
  getDriveStats: async (driveId: string): Promise<ApiResponse<{
    totalApplications: number;
    applicationsByStatus: Record<Application['status'], number>;
    applicationsByRound: Record<string, number>;
    selectionRate: number;
    averageTimeToReview: number;
  }>> => {
    const driveApplications = mockApplications.filter(app => app.driveId === driveId);
    
    const applicationsByStatus = driveApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<Application['status'], number>);

    const applicationsByRound = driveApplications.reduce((acc, app) => {
      if (app.currentRound) {
        acc[app.currentRound] = (acc[app.currentRound] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const selectedCount = applicationsByStatus.selected || 0;
    const selectionRate = driveApplications.length > 0 ? (selectedCount / driveApplications.length) * 100 : 0;

    const stats = {
      totalApplications: driveApplications.length,
      applicationsByStatus,
      applicationsByRound,
      selectionRate,
      averageTimeToReview: 2.5 // Mock value in days
    };

    return createMockApiCall(stats)();
  },

  // Get upcoming drives
  getUpcomingDrives: async (limit: number = 5): Promise<ApiResponse<Drive[]>> => {
    const upcoming = mockDrives
      .filter(drive => drive.status === 'active' && new Date(drive.deadline) > new Date())
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, limit);

    return createMockApiCall(upcoming)();
  },

  // Get drives by company
  getDrivesByCompany: async (companyId: string): Promise<ApiResponse<Drive[]>> => {
    const companyDrives = mockDrives.filter(drive => drive.companyId === companyId);
    return createMockApiCall(companyDrives)();
  },

  // Close drive
  closeDrive: async (driveId: string): Promise<ApiResponse<Drive>> => {
    const driveIndex = mockDrives.findIndex(d => d.id === driveId);
    if (driveIndex === -1) {
      throw new Error('Drive not found');
    }

    const closedDrive = { 
      ...mockDrives[driveIndex], 
      status: 'closed' as const,
      updatedAt: new Date().toISOString() 
    };
    
    mockDrives[driveIndex] = closedDrive;
    return createMockApiCall(closedDrive)();
  },

  // Duplicate drive
  duplicateDrive: async (driveId: string, newTitle: string): Promise<ApiResponse<Drive>> => {
    const originalDrive = mockDrives.find(d => d.id === driveId);
    if (!originalDrive) {
      throw new Error('Drive not found');
    }

    const duplicatedDrive: Drive = {
      ...originalDrive,
      id: `drive_${Date.now()}`,
      title: newTitle,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicantsCount: 0,
      selectedCount: 0
    };

    mockDrives.push(duplicatedDrive);
    return createMockApiCall(duplicatedDrive)();
  }
};
