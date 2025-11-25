import { ApiResponse, createMockApiCall } from './api';
import { Application, PaginatedResponse, PaginationParams, ApplicationFeedback, Interview, Drive, InterviewDetails } from './types';
import { drivesService } from './drivesService';

// Get mock drives from drivesService (we'll access the internal data)
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
  }
];

// Mock applications data
const mockApplications: Application[] = [
  {
    id: 'app_1',
    studentId: 'student_1',
    driveId: 'drive_1',
    collegeId: 'COL001',
    driveTitle: 'Software Engineer Intern',
    company: 'Google',
    status: 'under_review',
    appliedAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
    currentRound: 'Technical Interview',
    nextRound: 'HR Interview',
    resume: '/resumes/john_doe.pdf',
    coverLetter: 'I am excited about this opportunity...',
    feedback: [
      {
        id: 'feedback_1',
        round: 'Online Test',
        feedback: 'Good problem solving skills, strong in algorithms',
        rating: 4,
        interviewerId: 'interviewer_1',
        interviewerName: 'John Interviewer',
        createdAt: '2024-01-11T15:00:00Z'
      },
      {
        id: 'feedback_2',
        round: 'Resume Screening',
        feedback: 'Strong academic background, relevant projects',
        rating: 5,
        interviewerId: 'recruiter_1',
        interviewerName: 'Jane Recruiter',
        createdAt: '2024-01-10T16:00:00Z'
      }
    ]
  },
  {
    id: 'app_2',
    studentId: 'student_2',
    driveId: 'drive_1',
    collegeId: 'COL001',
    driveTitle: 'Software Engineer Intern',
    company: 'Google',
    status: 'shortlisted',
    appliedAt: '2024-01-09T15:45:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
    currentRound: 'HR Interview',
    nextRound: 'Final Round',
    resume: '/resumes/jane_smith.pdf',
    feedback: [
      {
        id: 'feedback_3',
        round: 'Technical Interview',
        feedback: 'Excellent coding skills, good system design understanding',
        rating: 5,
        interviewerId: 'interviewer_2',
        interviewerName: 'Mike Interviewer',
        createdAt: '2024-01-12T14:00:00Z'
      }
    ]
  },
  {
    id: 'app_3',
    studentId: 'student_1',
    driveId: 'drive_2',
    collegeId: 'COL001',
    driveTitle: 'Frontend Developer',
    company: 'Microsoft',
    status: 'applied',
    appliedAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    resume: '/resumes/john_doe.pdf'
  },
  {
    id: 'app_4',
    studentId: 'student_3',
    driveId: 'drive_2',
    collegeId: 'COL001',
    driveTitle: 'Frontend Developer',
    company: 'Microsoft',
    status: 'rejected',
    appliedAt: '2024-01-07T11:30:00Z',
    updatedAt: '2024-01-11T16:45:00Z',
    resume: '/resumes/student_3.pdf',
    feedback: [
      {
        id: 'feedback_4',
        round: 'Online Test',
        feedback: 'Did not meet technical requirements',
        rating: 2,
        interviewerId: 'system_1',
        interviewerName: 'Automated System',
        createdAt: '2024-01-10T10:00:00Z'
      }
    ]
  },
  {
    id: 'app_5',
    studentId: 'student_2',
    driveId: 'drive_3',
    driveTitle: 'Data Science Intern',
    company: 'Amazon',
    status: 'selected',
    appliedAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    currentRound: 'Completed',
    resume: '/resumes/jane_smith.pdf',
    feedback: [
      {
        id: 'feedback_5',
        round: 'Final Interview',
        feedback: 'Outstanding performance, strong analytical skills',
        rating: 5,
        interviewerId: 'interviewer_3',
        interviewerName: 'Sarah Interviewer',
        createdAt: '2024-01-14T15:00:00Z'
      }
    ],
    collegeId: 'college_1'
  }
];

// Mock interviews for applications
const mockInterviews: Interview[] = [
  {
    id: 'interview_1',
    applicationId: 'app_1',
    studentId: 'student_1',
    driveId: 'drive_1',
    type: 'technical',
    round: 2,
    scheduledAt: '2024-01-20T14:00:00Z',
    duration: 60,
    status: 'scheduled',
    interviewerId: 'interviewer_1',
    interviewerName: 'John Interviewer',
    meetingLink: 'https://meet.google.com/abc123'
  },
  {
    id: 'interview_2',
    applicationId: 'app_2',
    studentId: 'student_2',
    driveId: 'drive_1',
    type: 'hr',
    round: 3,
    scheduledAt: '2024-01-22T10:00:00Z',
    duration: 45,
    status: 'scheduled',
    interviewerId: 'interviewer_4',
    interviewerName: 'Emily HR',
    meetingLink: 'https://teams.microsoft.com/xyz789'
  }
];

// Applications service functions
export const applicationsService = {
  // Get all applications with filtering and pagination
  getApplications: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: Application['status'];
    driveId?: string;
    studentId?: string;
    company?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Application>>> => {
    let filteredApplications = [...mockApplications];

    // Apply filters
    if (params?.status) {
      filteredApplications = filteredApplications.filter(app => app.status === params.status);
    }

    if (params?.driveId) {
      filteredApplications = filteredApplications.filter(app => app.driveId === params.driveId);
    }

    if (params?.studentId) {
      filteredApplications = filteredApplications.filter(app => app.studentId === params.studentId);
    }

    if (params?.company) {
      filteredApplications = filteredApplications.filter(app => 
        app.company.toLowerCase().includes(params.company!.toLowerCase())
      );
    }

    if (params?.search) {
      filteredApplications = filteredApplications.filter(app =>
        app.driveTitle.toLowerCase().includes(params.search!.toLowerCase()) ||
        app.company.toLowerCase().includes(params.search!.toLowerCase()) ||
        app.studentId.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    // Apply sorting
    if (params?.sortBy) {
      filteredApplications.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Application];
        const bValue = b[params.sortBy as keyof Application];
        
        // Handle undefined values safely
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return params.sortOrder === 'desc' ? -1 : 1;
        if (bValue === undefined) return params.sortOrder === 'desc' ? 1 : -1;
        
        if (aValue < bValue) return params.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return params.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
    } else {
      // Default sort by application date
      filteredApplications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedApplications = filteredApplications.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedApplications,
      pagination: {
        page,
        limit,
        total: filteredApplications.length,
        totalPages: Math.ceil(filteredApplications.length / limit),
        hasNext: endIndex < filteredApplications.length,
        hasPrev: page > 1
      }
    })();
  },

  // Get application by ID
  getApplicationById: async (applicationId: string): Promise<ApiResponse<Application>> => {
    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }
    return createMockApiCall(application)();
  },

  // Create new application
  createApplication: async (applicationData: Omit<Application, 'id' | 'appliedAt' | 'updatedAt' | 'feedback'>): Promise<ApiResponse<Application>> => {
    // Check if student already applied to this drive
    const existingApplication = mockApplications.find(
      app => app.studentId === applicationData.studentId && app.driveId === applicationData.driveId
    );
    
    if (existingApplication) {
      throw new Error('Student has already applied to this drive');
    }

    const newApplication: Application = {
      ...applicationData,
      id: `app_${Date.now()}`,
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      feedback: []
    };

    mockApplications.push(newApplication);
    return createMockApiCall(newApplication)();
  },

  // Update application
  updateApplication: async (applicationId: string, applicationData: Partial<Application>): Promise<ApiResponse<Application>> => {
    const appIndex = mockApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      throw new Error('Application not found');
    }

    const updatedApplication = { 
      ...mockApplications[appIndex], 
      ...applicationData, 
      updatedAt: new Date().toISOString() 
    };
    
    mockApplications[appIndex] = updatedApplication;
    return createMockApiCall(updatedApplication)();
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

  // Add feedback to application
  addFeedback: async (applicationId: string, feedbackData: Omit<ApplicationFeedback, 'id' | 'createdAt'>): Promise<ApiResponse<ApplicationFeedback>> => {
    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    const newFeedback: ApplicationFeedback = {
      ...feedbackData,
      id: `feedback_${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (!application.feedback) {
      application.feedback = [];
    }
    application.feedback.push(newFeedback);
    application.updatedAt = new Date().toISOString();

    return createMockApiCall(newFeedback)();
  },

  // Get application feedback
  getApplicationFeedback: async (applicationId: string): Promise<ApiResponse<ApplicationFeedback[]>> => {
    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    return createMockApiCall(application.feedback || [])();
  },

  // Get applications statistics
  getApplicationsStats: async (filters?: {
    driveId?: string;
    companyId?: string;
    collegeId?: string;
    dateRange?: {
      start: string;
      end: string;
    };
  }): Promise<ApiResponse<{
    totalApplications: number;
    applicationsByStatus: Record<Application['status'], number>;
    applicationsByCompany: Record<string, number>;
    applicationsByDrive: Record<string, number>;
    selectionRate: number;
    averageTimeToReview: number;
    monthlyTrends: Array<{
      month: string;
      applications: number;
      selections: number;
    }>;
  }>> => {
    let filteredApplications = [...mockApplications];

    // Apply filters
    if (filters?.driveId) {
      filteredApplications = filteredApplications.filter(app => app.driveId === filters.driveId);
    }

    if (filters?.companyId) {
      filteredApplications = filteredApplications.filter(app => app.company === filters.companyId);
    }

    if (filters?.dateRange) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filteredApplications = filteredApplications.filter(app => {
        const appDate = new Date(app.appliedAt);
        return appDate >= startDate && appDate <= endDate;
      });
    }

    const applicationsByStatus = filteredApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<Application['status'], number>);

    const applicationsByCompany = filteredApplications.reduce((acc, app) => {
      acc[app.company] = (acc[app.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const applicationsByDrive = filteredApplications.reduce((acc, app) => {
      acc[app.driveTitle] = (acc[app.driveTitle] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const selectedCount = applicationsByStatus.selected || 0;
    const selectionRate = filteredApplications.length > 0 ? (selectedCount / filteredApplications.length) * 100 : 0;

    // Mock monthly trends
    const monthlyTrends = [
      { month: '2024-01', applications: 45, selections: 8 },
      { month: '2024-02', applications: 62, selections: 12 },
      { month: '2024-03', applications: 38, selections: 6 }
    ];

    const stats = {
      totalApplications: filteredApplications.length,
      applicationsByStatus,
      applicationsByCompany,
      applicationsByDrive,
      selectionRate,
      averageTimeToReview: 2.3,
      monthlyTrends
    };

    return createMockApiCall(stats)();
  },

  // Get applications for student
  getStudentApplications: async (studentId: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Application>>> => {
    let studentApplications = mockApplications.filter(app => app.studentId === studentId);

    if (params?.search) {
      studentApplications = studentApplications.filter(app =>
        app.driveTitle.toLowerCase().includes(params.search!.toLowerCase()) ||
        app.company.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedApplications = studentApplications.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedApplications,
      pagination: {
        page,
        limit,
        total: studentApplications.length,
        totalPages: Math.ceil(studentApplications.length / limit),
        hasNext: endIndex < studentApplications.length,
        hasPrev: page > 1
      }
    })();
  },

  // Get applications for drive
  getDriveApplications: async (driveId: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Application>>> => {
    let driveApplications = mockApplications.filter(app => app.driveId === driveId);

    if (params?.search) {
      driveApplications = driveApplications.filter(app =>
        app.studentId.toLowerCase().includes(params.search!.toLowerCase())
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

  // Withdraw application
  withdrawApplication: async (applicationId: string): Promise<ApiResponse<Application>> => {
    const appIndex = mockApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      throw new Error('Application not found');
    }

    const withdrawnApplication = { 
      ...mockApplications[appIndex], 
      status: 'withdrawn' as const,
      updatedAt: new Date().toISOString() 
    };
    
    mockApplications[appIndex] = withdrawnApplication;
    return createMockApiCall(withdrawnApplication)();
  },

  // Get interview schedule for application
  getApplicationInterviews: async (applicationId: string): Promise<ApiResponse<Interview[]>> => {
    const applicationInterviews = mockInterviews.filter(interview => interview.applicationId === applicationId);
    return createMockApiCall(applicationInterviews)();
  },

  // Schedule interview
  scheduleInterview: async (interviewData: Omit<Interview, 'id'>): Promise<ApiResponse<Interview>> => {
    const newInterview: Interview = {
      ...interviewData,
      id: `interview_${Date.now()}`
    };

    mockInterviews.push(newInterview);
    return createMockApiCall(newInterview)();
  },

  // Update interview status
  updateInterviewStatus: async (interviewId: string, status: Interview['status']): Promise<ApiResponse<Interview>> => {
    const interviewIndex = mockInterviews.findIndex(interview => interview.id === interviewId);
    if (interviewIndex === -1) {
      throw new Error('Interview not found');
    }

    const updatedInterview = { 
      ...mockInterviews[interviewIndex], 
      status 
    };
    
    mockInterviews[interviewIndex] = updatedInterview;
    return createMockApiCall(updatedInterview)();
  },

  // Application Workflow Foundation Methods
  
  // Apply to drive - creates new application
  applyToDrive: async (studentId: string, driveId: string, collegeId: string): Promise<ApiResponse<Application>> => {
    console.log('applyToDrive - studentId:', studentId, 'driveId:', driveId, 'collegeId:', collegeId);
    
    // Check if student has already applied to this drive
    const existingApplication = mockApplications.find(
      app => app.studentId === studentId && app.driveId === driveId
    );
    
    if (existingApplication) {
      throw new Error('Student has already applied to this drive');
    }
    
    // Get drive details for drive title and company
    const drive = mockDrives.find(d => d.id === driveId);
    if (!drive) {
      throw new Error('Drive not found');
    }
    
    // Create new application object
    const newApplication: Application = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      studentId,
      driveId,
      collegeId,
      driveTitle: drive.title,
      company: drive.company,
      status: 'applied',
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    console.log('applyToDrive - newApplication:', newApplication);
    
    // Add to mock applications array
    mockApplications.push(newApplication);
    
    return createMockApiCall(newApplication)();
  },

  // Get applications by student
  getApplicationsByStudent: async (studentId: string): Promise<ApiResponse<Application[]>> => {
    console.log('getApplicationsByStudent - studentId:', studentId);
    
    const studentApplications = mockApplications.filter(app => app.studentId === studentId);
    
    console.log('getApplicationsByStudent - found applications:', studentApplications.length);
    
    return createMockApiCall(studentApplications)();
  },

  // Get applications by college
  getApplicationsByCollege: async (collegeId: string): Promise<ApiResponse<Application[]>> => {
    console.log('getApplicationsByCollege - collegeId:', collegeId);
    
    const collegeApplications = mockApplications.filter(app => app.collegeId === collegeId);
    
    console.log('getApplicationsByCollege - found applications:', collegeApplications.length);
    
    return createMockApiCall(collegeApplications)();
  },

  // Get applications by drive
  getApplicationsByDrive: async (driveId: string): Promise<ApiResponse<Application[]>> => {
    console.log('getApplicationsByDrive - driveId:', driveId);
    
    const driveApplications = mockApplications.filter(app => app.driveId === driveId);
    
    console.log('getApplicationsByDrive - found applications:', driveApplications.length);
    
    return createMockApiCall(driveApplications)();
  }
};
