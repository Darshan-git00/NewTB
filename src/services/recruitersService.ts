import { ApiResponse, createMockApiCall } from './api';
import { Recruiter, Drive, Application, Student, PaginatedResponse, PaginationParams } from './types';

// Mock recruiters data
const mockRecruiters: Recruiter[] = [
  {
    id: 'recruiter_1',
    name: 'John Recruiter',
    email: 'recruiter@talentbridge.com',
    role: 'recruiter',
    phone: '+1234567890',
    company: 'Google',
    position: 'Senior Technical Recruiter',
    department: 'Engineering',
    experience: '5 years',
    linkedinProfile: 'https://linkedin.com/in/johnrecruiter',
    collegeId: 'COL001',
    collegeName: 'MIT College',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-12-01T15:30:00Z'
  },
  {
    id: 'recruiter_2',
    name: 'Jane Recruiter',
    email: 'jane.recruiter@talentbridge.com',
    role: 'recruiter',
    phone: '+0987654321',
    company: 'Microsoft',
    position: 'Talent Acquisition Specialist',
    department: 'HR',
    experience: '3 years',
    linkedinProfile: 'https://linkedin.com/in/janerecruiter',
    collegeId: 'COL002',
    collegeName: 'Stanford University',
    createdAt: '2023-03-20T14:30:00Z',
    updatedAt: '2023-11-15T09:45:00Z'
  },
  {
    id: 'recruiter_3',
    name: 'Mike Recruiter',
    email: 'mike@talentbridge.com',
    role: 'recruiter',
    phone: '+1122334455',
    company: 'Amazon',
    position: 'Senior Recruiter',
    department: 'Talent Acquisition',
    experience: '7 years',
    linkedinProfile: 'https://linkedin.com/in/mikerecruiter',
    createdAt: '2023-02-10T11:00:00Z',
    updatedAt: '2023-10-20T16:20:00Z'
  }
];

// Mock drives created by recruiters
const mockRecruiterDrives: Drive[] = [
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

// Mock students for recruiter view
const mockStudents: Student[] = [
  {
    id: 'student_1',
    name: 'John Doe',
    email: 'student@talentbridge.com',
    role: 'student',
    phone: '+1234567890',
    collegeId: 'COL001',
    collegeName: 'MIT College',
    course: 'Computer Science',
    branch: 'AI/ML',
    year: '3rd',
    cgpa: 8.5,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning'],
    certifications: [
      {
        id: 'cert_1',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        year: '2023',
        credentialId: 'AWS-123456'
      }
    ],
    resume: '/resumes/john_doe.pdf',
    portfolio: 'https://johndoe.dev',
    linkedinProfile: 'https://linkedin.com/in/johndoe',
    githubProfile: 'https://github.com/johndoe',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-12-01T15:30:00Z'
  },
  {
    id: 'student_2',
    name: 'Jane Smith',
    email: 'jane@talentbridge.com',
    role: 'student',
    phone: '+0987654321',
    collegeId: 'COL001',
    collegeName: 'MIT College',
    course: 'Information Technology',
    branch: 'Web Development',
    year: '4th',
    cgpa: 9.2,
    skills: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'MongoDB'],
    certifications: [
      {
        id: 'cert_2',
        name: 'React Developer Certification',
        issuer: 'Meta',
        year: '2023',
        credentialId: 'META-345678'
      }
    ],
    resume: '/resumes/jane_smith.pdf',
    portfolio: 'https://janesmith.dev',
    linkedinProfile: 'https://linkedin.com/in/janesmith',
    githubProfile: 'https://github.com/janesmith',
    createdAt: '2023-02-20T14:30:00Z',
    updatedAt: '2023-11-15T09:45:00Z'
  }
];

// Mock applications for recruiter drives
const mockRecruiterApplications: Application[] = [
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
    nextRound: 'HR Interview',
    collegeId: 'college_1'
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
    nextRound: 'Final Round',
    collegeId: 'college_1'
  }
];

// Recruiters service functions
export const recruitersService = {
  // Profile management
  getProfile: async (recruiterId: string): Promise<ApiResponse<Recruiter>> => {
    const recruiter = mockRecruiters.find(r => r.id === recruiterId);
    if (!recruiter) {
      throw new Error('Recruiter not found');
    }
    return createMockApiCall(recruiter)();
  },

  updateProfile: async (recruiterId: string, data: Partial<Recruiter>): Promise<ApiResponse<Recruiter>> => {
    const recruiterIndex = mockRecruiters.findIndex(r => r.id === recruiterId);
    if (recruiterIndex === -1) {
      throw new Error('Recruiter not found');
    }
    
    const updatedRecruiter = { ...mockRecruiters[recruiterIndex], ...data, updatedAt: new Date().toISOString() };
    mockRecruiters[recruiterIndex] = updatedRecruiter;
    
    return createMockApiCall(updatedRecruiter)();
  },

  // Drive management
  getDrives: async (recruiterId: string, params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Drive>>> => {
    let recruiterDrives = mockRecruiterDrives.filter(drive => drive.createdBy === recruiterId);

    if (params?.status) {
      recruiterDrives = recruiterDrives.filter(drive => drive.status === params.status);
    }

    if (params?.search) {
      recruiterDrives = recruiterDrives.filter(drive => 
        drive.title.toLowerCase().includes(params.search!.toLowerCase()) ||
        drive.company.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    // Apply sorting
    if (params?.sortBy) {
      recruiterDrives.sort((a, b) => {
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

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedDrives = recruiterDrives.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedDrives,
      pagination: {
        page,
        limit,
        total: recruiterDrives.length,
        totalPages: Math.ceil(recruiterDrives.length / limit),
        hasNext: endIndex < recruiterDrives.length,
        hasPrev: page > 1
      }
    })();
  },

  createDrive: async (recruiterId: string, driveData: Omit<Drive, 'id' | 'createdBy' | 'createdAt' | 'updatedAt' | 'applicantsCount' | 'selectedCount'>): Promise<ApiResponse<Drive>> => {
    const newDrive: Drive = {
      ...driveData,
      id: `drive_${Date.now()}`,
      createdBy: recruiterId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applicantsCount: 0,
      selectedCount: 0
    };

    mockRecruiterDrives.push(newDrive);
    return createMockApiCall(newDrive)();
  },

  updateDrive: async (driveId: string, driveData: Partial<Drive>): Promise<ApiResponse<Drive>> => {
    const driveIndex = mockRecruiterDrives.findIndex(d => d.id === driveId);
    if (driveIndex === -1) {
      throw new Error('Drive not found');
    }

    const updatedDrive = { 
      ...mockRecruiterDrives[driveIndex], 
      ...driveData, 
      updatedAt: new Date().toISOString() 
    };
    
    mockRecruiterDrives[driveIndex] = updatedDrive;
    return createMockApiCall(updatedDrive)();
  },

  deleteDrive: async (driveId: string): Promise<ApiResponse<void>> => {
    const driveIndex = mockRecruiterDrives.findIndex(d => d.id === driveId);
    if (driveIndex === -1) {
      throw new Error('Drive not found');
    }

    mockRecruiterDrives.splice(driveIndex, 1);
    return createMockApiCall(undefined)();
  },

  // Application management
  getDriveApplications: async (driveId: string, params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: Application['status'];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Application>>> => {
    let driveApplications = mockRecruiterApplications.filter(app => app.driveId === driveId);

    if (params?.status) {
      driveApplications = driveApplications.filter(app => app.status === params.status);
    }

    if (params?.search) {
      driveApplications = driveApplications.filter(app =>
        app.studentId.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    // Apply sorting
    if (params?.sortBy) {
      driveApplications.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Application];
        const bValue = b[params.sortBy as keyof Application];
        
        // Handle undefined values
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return params.sortOrder === 'desc' ? -1 : 1;
        if (bValue === undefined) return params.sortOrder === 'desc' ? 1 : -1;
        
        if (aValue < bValue) return params.sortOrder === 'desc' ? 1 : -1;
        if (aValue > bValue) return params.sortOrder === 'desc' ? -1 : 1;
        return 0;
      });
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

  updateApplicationStatus: async (applicationId: string, status: Application['status'], notes?: string): Promise<ApiResponse<Application>> => {
    const appIndex = mockRecruiterApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      throw new Error('Application not found');
    }

    const updatedApplication = { 
      ...mockRecruiterApplications[appIndex], 
      status,
      notes,
      updatedAt: new Date().toISOString() 
    };
    
    mockRecruiterApplications[appIndex] = updatedApplication;
    return createMockApiCall(updatedApplication)();
  },

  // Student search and management
  searchStudents: async (params: {
    search?: string;
    skills?: string[];
    college?: string;
    course?: string;
    branch?: string;
    minCgpa?: number;
    year?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PaginatedResponse<Student>>> => {
    let filteredStudents = [...mockStudents];

    if (params.search) {
      filteredStudents = filteredStudents.filter(student =>
        student.name.toLowerCase().includes(params.search!.toLowerCase()) ||
        student.email.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    if (params.skills && params.skills.length > 0) {
      filteredStudents = filteredStudents.filter(student =>
        params.skills!.some(skill => student.skills.includes(skill))
      );
    }

    if (params.college) {
      filteredStudents = filteredStudents.filter(student =>
        student.collegeName.toLowerCase().includes(params.college!.toLowerCase())
      );
    }

    if (params.course) {
      filteredStudents = filteredStudents.filter(student =>
        student.course.toLowerCase().includes(params.course!.toLowerCase())
      );
    }

    if (params.branch) {
      filteredStudents = filteredStudents.filter(student =>
        student.branch.toLowerCase().includes(params.branch!.toLowerCase())
      );
    }

    if (params.minCgpa) {
      filteredStudents = filteredStudents.filter(student => student.cgpa >= params.minCgpa!);
    }

    if (params.year) {
      filteredStudents = filteredStudents.filter(student => student.year === params.year);
    }

    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedStudents,
      pagination: {
        page,
        limit,
        total: filteredStudents.length,
        totalPages: Math.ceil(filteredStudents.length / limit),
        hasNext: endIndex < filteredStudents.length,
        hasPrev: page > 1
      }
    })();
  },

  getStudentProfile: async (studentId: string): Promise<ApiResponse<Student>> => {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    return createMockApiCall(student)();
  },

  // Analytics and statistics
  getDashboardStats: async (recruiterId: string): Promise<ApiResponse<{
    totalDrives: number;
    activeDrives: number;
    totalApplications: number;
    pendingApplications: number;
    shortlistedApplications: number;
    interviewScheduledApplications: number;
    acceptedApplications: number;
    selectedApplications: number;
    recentActivity: Array<{
      type: 'drive_created' | 'application_received' | 'status_updated';
      description: string;
      timestamp: string;
    }>;
    applicationTrends: Array<{
      month: string;
      applications: number;
      selections: number;
    }>;
  }>> => {
    const recruiterDrives = mockRecruiterDrives.filter(drive => drive.createdBy === recruiterId);
    const recruiterApplications = mockRecruiterApplications.filter(app => 
      recruiterDrives.some(drive => drive.id === app.driveId)
    );

    const stats = {
      totalDrives: recruiterDrives.length,
      activeDrives: recruiterDrives.filter(drive => drive.status === 'active').length,
      totalApplications: recruiterApplications.length,
      pendingApplications: recruiterApplications.filter(app => app.status === 'applied').length,
      shortlistedApplications: recruiterApplications.filter(app => app.status === 'shortlisted').length,
      interviewScheduledApplications: recruiterApplications.filter(app => app.status === 'interview_scheduled').length,
      acceptedApplications: recruiterApplications.filter(app => app.status === 'accepted').length,
      selectedApplications: recruiterApplications.filter(app => app.status === 'selected').length,
      recentActivity: [
        {
          type: 'application_received' as const,
          description: 'New application for Software Engineer Intern',
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          type: 'status_updated' as const,
          description: 'Updated status for John Doe application',
          timestamp: '2024-01-14T15:20:00Z'
        }
      ],
      applicationTrends: [
        { month: '2024-01', applications: 45, selections: 8 },
        { month: '2024-02', applications: 62, selections: 12 },
        { month: '2024-03', applications: 38, selections: 6 }
      ]
    };

    return createMockApiCall(stats)();
  },

  // Bulk operations
  bulkUpdateApplicationStatus: async (applicationIds: string[], status: Application['status']): Promise<ApiResponse<Application[]>> => {
    const updatedApplications: Application[] = [];
    
    for (const applicationId of applicationIds) {
      const appIndex = mockRecruiterApplications.findIndex(app => app.id === applicationId);
      if (appIndex !== -1) {
        const updatedApplication = { 
          ...mockRecruiterApplications[appIndex], 
          status,
          updatedAt: new Date().toISOString() 
        };
        mockRecruiterApplications[appIndex] = updatedApplication;
        updatedApplications.push(updatedApplication);
      }
    }

    return createMockApiCall(updatedApplications)();
  },

  // Export functionality
  exportApplications: async (driveId: string, format: 'csv' | 'excel' | 'pdf'): Promise<ApiResponse<{ url: string; filename: string }>> => {
    const driveApplications = mockRecruiterApplications.filter(app => app.driveId === driveId);
    
    // Mock export functionality
    const exportData = {
      url: `https://example.com/exports/drive_${driveId}_applications.${format}`,
      filename: `drive_${driveId}_applications.${format}`
    };

    return createMockApiCall(exportData)();
  }
};
