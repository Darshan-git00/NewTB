import { ApiResponse, createMockApiCall } from './api';
import { College, Student, Drive, Application, PaginatedResponse, PaginationParams } from './types';

// Mock colleges data
const mockColleges: College[] = [
  {
    id: 'college_1',
    name: 'MIT College',
    email: 'info@mitcollege.edu',
    role: 'college',
    phone: '+1234567890',
    address: '123 Main St, Cambridge, MA 02142',
    website: 'https://mitcollege.edu',
    establishedYear: '1861',
    type: 'Engineering',
    accreditation: 'NEASC',
    totalStudents: 11520,
    departments: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering'],
    collegeId: 'COL001',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-12-01T15:30:00Z'
  },
  {
    id: 'college_2',
    name: 'Stanford University',
    email: 'admissions@stanford.edu',
    role: 'college',
    phone: '+0987654321',
    address: '450 Serra Mall, Stanford, CA 94305',
    website: 'https://stanford.edu',
    establishedYear: '1885',
    type: 'Research University',
    accreditation: 'WASC',
    totalStudents: 17280,
    departments: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Medicine', 'Business'],
    collegeId: 'COL002',
    createdAt: '2023-02-20T14:30:00Z',
    updatedAt: '2023-11-15T09:45:00Z'
  },
  {
    id: 'college_3',
    name: 'UC Berkeley',
    email: 'info@berkeley.edu',
    role: 'college',
    phone: '+1122334455',
    address: 'Berkeley, CA 94720',
    website: 'https://berkeley.edu',
    establishedYear: '1868',
    type: 'Public Research University',
    accreditation: 'WASC',
    totalStudents: 30700,
    departments: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Biology', 'Chemistry'],
    collegeId: 'COL003',
    createdAt: '2023-03-10T11:00:00Z',
    updatedAt: '2023-10-20T16:20:00Z'
  }
];

// Mock students for colleges
const mockCollegeStudents: Student[] = [
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
    aiScore: 85,
    projectExperience: 5,
    skillMatch: 92,
    status: 'active',
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
    aiScore: 92,
    projectExperience: 8,
    skillMatch: 88,
    status: 'placed',
    createdAt: '2023-02-20T14:30:00Z',
    updatedAt: '2023-11-15T09:45:00Z'
  },
  {
    id: 'student_3',
    name: 'Mike Johnson',
    email: 'mike@talentbridge.com',
    role: 'student',
    phone: '+1122334455',
    collegeId: 'COL001',
    collegeName: 'MIT College',
    course: 'Electrical Engineering',
    branch: 'Power Systems',
    year: '2nd',
    cgpa: 7.8,
    skills: ['MATLAB', 'Python', 'C++', 'Circuit Design', 'Power Electronics'],
    certifications: [
      {
        id: 'cert_3',
        name: 'Python Programming',
        issuer: 'Coursera',
        year: '2023',
        credentialId: 'COUR-789012'
      }
    ],
    resume: '/resumes/mike_johnson.pdf',
    linkedinProfile: 'https://linkedin.com/in/mikejohnson',
    aiScore: 75,
    projectExperience: 3,
    skillMatch: 78,
    status: 'active',
    createdAt: '2023-06-15T12:00:00Z',
    updatedAt: '2023-10-20T16:20:00Z'
  }
];

// Mock drives for colleges
const mockCollegeDrives: Drive[] = [
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

// Mock applications for college students
const mockCollegeApplications: Application[] = [
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
    collegeId: 'COL001'
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
    collegeId: 'COL001'
  },
  {
    id: 'app_3',
    studentId: 'student_3',
    driveId: 'drive_2',
    driveTitle: 'Frontend Developer',
    company: 'Microsoft',
    status: 'applied',
    appliedAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    collegeId: 'COL001'
  }
];

// Colleges service functions
export const collegesService = {
  // Profile management
  getProfile: async (collegeId: string): Promise<ApiResponse<College>> => {
    const college = mockColleges.find(c => c.id === collegeId);
    if (!college) {
      throw new Error('College not found');
    }
    return createMockApiCall(college)();
  },

  updateProfile: async (collegeId: string, data: Partial<College>): Promise<ApiResponse<College>> => {
    const collegeIndex = mockColleges.findIndex(c => c.id === collegeId);
    if (collegeIndex === -1) {
      throw new Error('College not found');
    }
    
    const updatedCollege = { ...mockColleges[collegeIndex], ...data, updatedAt: new Date().toISOString() };
    mockColleges[collegeIndex] = updatedCollege;
    
    return createMockApiCall(updatedCollege)();
  },

  // Student management
  getStudents: async (collegeId: string, params?: {
    page?: number;
    limit?: number;
    search?: string;
    course?: string;
    branch?: string;
    year?: string;
    minCgpa?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Student>>> => {
    let collegeStudents = mockCollegeStudents.filter(student => student.collegeId === collegeId);

    if (params?.search) {
      collegeStudents = collegeStudents.filter(student =>
        student.name.toLowerCase().includes(params.search!.toLowerCase()) ||
        student.email.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    if (params?.course) {
      collegeStudents = collegeStudents.filter(student =>
        student.course.toLowerCase().includes(params.course!.toLowerCase())
      );
    }

    if (params?.branch) {
      collegeStudents = collegeStudents.filter(student =>
        student.branch.toLowerCase().includes(params.branch!.toLowerCase())
      );
    }

    if (params?.year) {
      collegeStudents = collegeStudents.filter(student => student.year === params.year);
    }

    if (params?.minCgpa) {
      collegeStudents = collegeStudents.filter(student => student.cgpa >= params.minCgpa!);
    }

    // Apply sorting
    if (params?.sortBy) {
      collegeStudents.sort((a, b) => {
        const aValue = a[params.sortBy as keyof Student];
        const bValue = b[params.sortBy as keyof Student];
        
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
    
    const paginatedStudents = collegeStudents.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedStudents,
      pagination: {
        page,
        limit,
        total: collegeStudents.length,
        totalPages: Math.ceil(collegeStudents.length / limit),
        hasNext: endIndex < collegeStudents.length,
        hasPrev: page > 1
      }
    })();
  },

  getStudentById: async (collegeId: string, studentId: string): Promise<ApiResponse<Student>> => {
    const student = mockCollegeStudents.find(s => s.id === studentId && s.collegeId === collegeId);
    if (!student) {
      throw new Error('Student not found');
    }
    return createMockApiCall(student)();
  },

  addStudent: async (collegeId: string, studentData: Omit<Student, 'id' | 'collegeId' | 'collegeName' | 'createdAt' | 'updatedAt' | 'role'>): Promise<ApiResponse<Student>> => {
    const college = mockColleges.find(c => c.id === collegeId);
    if (!college) {
      throw new Error('College not found');
    }

    const newStudent: Student = {
      ...studentData,
      id: `student_${Date.now()}`,
      collegeId,
      collegeName: college.name,
      role: 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockCollegeStudents.push(newStudent);
    return createMockApiCall(newStudent)();
  },

  updateStudent: async (collegeId: string, studentId: string, studentData: Partial<Student>): Promise<ApiResponse<Student>> => {
    const studentIndex = mockCollegeStudents.findIndex(s => s.id === studentId && s.collegeId === collegeId);
    if (studentIndex === -1) {
      throw new Error('Student not found');
    }

    const updatedStudent = { 
      ...mockCollegeStudents[studentIndex], 
      ...studentData, 
      updatedAt: new Date().toISOString() 
    };
    
    mockCollegeStudents[studentIndex] = updatedStudent;
    return createMockApiCall(updatedStudent)();
  },

  // Drive management
  getDrives: async (collegeId: string, params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    type?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Drive>>> => {
    // Get drives that are either on-campus at this college or open to all colleges
    let collegeDrives = mockCollegeDrives.filter(drive => 
      drive.type === 'on-campus' || drive.type === 'virtual'
    );

    if (params?.status) {
      collegeDrives = collegeDrives.filter(drive => drive.status === params.status);
    }

    if (params?.type) {
      collegeDrives = collegeDrives.filter(drive => drive.type === params.type);
    }

    if (params?.search) {
      collegeDrives = collegeDrives.filter(drive => 
        drive.title.toLowerCase().includes(params.search!.toLowerCase()) ||
        drive.company.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    // Apply sorting
    if (params?.sortBy) {
      collegeDrives.sort((a, b) => {
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
    
    const paginatedDrives = collegeDrives.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedDrives,
      pagination: {
        page,
        limit,
        total: collegeDrives.length,
        totalPages: Math.ceil(collegeDrives.length / limit),
        hasNext: endIndex < collegeDrives.length,
        hasPrev: page > 1
      }
    })();
  },

  // Application management
  getApplications: async (collegeId: string, params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: Application['status'];
    company?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Application>>> => {
    let collegeApplications = mockCollegeApplications.filter(app => {
      const student = mockCollegeStudents.find(s => s.id === app.studentId);
      return student && student.collegeId === collegeId;
    });

    if (params?.status) {
      collegeApplications = collegeApplications.filter(app => app.status === params.status);
    }

    if (params?.company) {
      collegeApplications = collegeApplications.filter(app =>
        app.company.toLowerCase().includes(params.company!.toLowerCase())
      );
    }

    if (params?.search) {
      collegeApplications = collegeApplications.filter(app =>
        app.driveTitle.toLowerCase().includes(params.search!.toLowerCase()) ||
        app.company.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    // Apply sorting
    if (params?.sortBy) {
      collegeApplications.sort((a, b) => {
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
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedApplications = collegeApplications.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedApplications,
      pagination: {
        page,
        limit,
        total: collegeApplications.length,
        totalPages: Math.ceil(collegeApplications.length / limit),
        hasNext: endIndex < collegeApplications.length,
        hasPrev: page > 1
      }
    })();
  },

  // Analytics and statistics
  getDashboardStats: async (collegeId: string): Promise<ApiResponse<{
    totalStudents: number;
    totalApplications: number;
    activeDrives: number;
    selectedStudents: number;
    applicationsByStatus: Record<Application['status'], number>;
    applicationsByCompany: Record<string, number>;
    topSkills: Array<{ skill: string; count: number }>;
    placementRate: number;
    averagePackage: number;
    recentActivity: Array<{
      type: 'student_added' | 'application_submitted' | 'student_selected';
      description: string;
      timestamp: string;
    }>;
    monthlyTrends: Array<{
      month: string;
      applications: number;
      selections: number;
      drives: number;
    }>;
  }>> => {
    const collegeStudents = mockCollegeStudents.filter(student => student.collegeId === collegeId);
    const collegeApplications = mockCollegeApplications.filter(app => {
      const student = mockCollegeStudents.find(s => s.id === app.studentId);
      return student && student.collegeId === collegeId;
    });

    const applicationsByStatus = collegeApplications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<Application['status'], number>);

    const applicationsByCompany = collegeApplications.reduce((acc, app) => {
      acc[app.company] = (acc[app.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get top skills from students
    const allSkills = collegeStudents.flatMap(student => student.skills);
    const skillCounts = allSkills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSkills = Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const selectedCount = applicationsByStatus.selected || 0;
    const placementRate = collegeApplications.length > 0 ? (selectedCount / collegeApplications.length) * 100 : 0;

    const stats = {
      totalStudents: collegeStudents.length,
      totalApplications: collegeApplications.length,
      activeDrives: mockCollegeDrives.filter(drive => drive.status === 'active').length,
      selectedStudents: selectedCount,
      applicationsByStatus,
      applicationsByCompany,
      topSkills,
      placementRate,
      averagePackage: 95000, // Mock value
      recentActivity: [
        {
          type: 'application_submitted' as const,
          description: 'John Doe applied to Google Software Engineer Intern',
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          type: 'student_selected' as const,
          description: 'Jane Smith was selected by Microsoft',
          timestamp: '2024-01-14T15:20:00Z'
        }
      ],
      monthlyTrends: [
        { month: '2024-01', applications: 45, selections: 8, drives: 12 },
        { month: '2024-02', applications: 62, selections: 12, drives: 15 },
        { month: '2024-03', applications: 38, selections: 6, drives: 8 }
      ]
    };

    return createMockApiCall(stats)();
  },

  // Reports and analytics
  getPlacementReport: async (collegeId: string, params?: {
    academicYear?: string;
    department?: string;
    format?: 'json' | 'csv' | 'pdf';
  }): Promise<ApiResponse<{
    summary: {
      totalStudents: number;
      placedStudents: number;
      placementRate: number;
      averagePackage: number;
      highestPackage: number;
      lowestPackage: number;
    };
    companyWise: Array<{
      company: string;
      studentsPlaced: number;
      averagePackage: number;
      roles: string[];
    }>;
    departmentWise: Array<{
      department: string;
      totalStudents: number;
      placedStudents: number;
      placementRate: number;
      averagePackage: number;
    }>;
    trends: Array<{
      month: string;
      placements: number;
      averagePackage: number;
    }>;
  }>> => {
    const collegeStudents = mockCollegeStudents.filter(student => student.collegeId === collegeId);
    const collegeApplications = mockCollegeApplications.filter(app => {
      const student = mockCollegeStudents.find(s => s.id === app.studentId);
      return student && student.collegeId === collegeId && app.status === 'selected';
    });

    const placedStudents = collegeApplications.length;
    const placementRate = collegeStudents.length > 0 ? (placedStudents / collegeStudents.length) * 100 : 0;

    const report = {
      summary: {
        totalStudents: collegeStudents.length,
        placedStudents,
        placementRate,
        averagePackage: 95000,
        highestPackage: 150000,
        lowestPackage: 60000
      },
      companyWise: [
        {
          company: 'Google',
          studentsPlaced: 5,
          averagePackage: 120000,
          roles: ['Software Engineer', 'Data Scientist']
        },
        {
          company: 'Microsoft',
          studentsPlaced: 3,
          averagePackage: 100000,
          roles: ['Frontend Developer', 'Backend Developer']
        }
      ],
      departmentWise: [
        {
          department: 'Computer Science',
          totalStudents: 150,
          placedStudents: 45,
          placementRate: 30,
          averagePackage: 110000
        },
        {
          department: 'Information Technology',
          totalStudents: 120,
          placedStudents: 28,
          placementRate: 23.3,
          averagePackage: 85000
        }
      ],
      trends: [
        { month: '2024-01', placements: 12, averagePackage: 95000 },
        { month: '2024-02', placements: 18, averagePackage: 98000 },
        { month: '2024-03', placements: 8, averagePackage: 92000 }
      ]
    };

    return createMockApiCall(report)();
  },

  // Bulk operations
  bulkUpdateStudents: async (collegeId: string, studentIds: string[], data: Partial<Student>): Promise<ApiResponse<Student[]>> => {
    const updatedStudents: Student[] = [];
    
    for (const studentId of studentIds) {
      const studentIndex = mockCollegeStudents.findIndex(s => s.id === studentId && s.collegeId === collegeId);
      if (studentIndex !== -1) {
        const updatedStudent = { 
          ...mockCollegeStudents[studentIndex], 
          ...data, 
          updatedAt: new Date().toISOString() 
        };
        mockCollegeStudents[studentIndex] = updatedStudent;
        updatedStudents.push(updatedStudent);
      }
    }

    return createMockApiCall(updatedStudents)();
  },

  // Export functionality
  exportStudents: async (collegeId: string, format: 'csv' | 'excel' | 'pdf', filters?: {
    course?: string;
    branch?: string;
    year?: string;
    minCgpa?: number;
  }): Promise<ApiResponse<{ url: string; filename: string }>> => {
    let filteredStudents = mockCollegeStudents.filter(student => student.collegeId === collegeId);

    if (filters) {
      if (filters.course) {
        filteredStudents = filteredStudents.filter(student => student.course === filters.course);
      }
      if (filters.branch) {
        filteredStudents = filteredStudents.filter(student => student.branch === filters.branch);
      }
      if (filters.year) {
        filteredStudents = filteredStudents.filter(student => student.year === filters.year);
      }
      if (filters.minCgpa) {
        filteredStudents = filteredStudents.filter(student => student.cgpa >= filters.minCgpa!);
      }
    }

    // Mock export functionality
    const exportData = {
      url: `https://example.com/exports/college_${collegeId}_students.${format}`,
      filename: `college_${collegeId}_students.${format}`
    };

    return createMockApiCall(exportData)();
  },

  // Skill-first student filtering engine (NO CGPA filtering)
  getFilteredStudents: async (collegeId: string, filters: import('./types').StudentFilters): Promise<ApiResponse<PaginatedResponse<Student>>> => {
    console.log('getFilteredStudents - collegeId:', collegeId, 'filters:', filters);
    
    // Load all students for the given college
    let filteredStudents = mockCollegeStudents.filter(student => student.collegeId === collegeId);
    
    // Fallback: If no students found, try common collegeId formats
    if (filteredStudents.length === 0) {
      console.log('getFilteredStudents - No students found for collegeId:', collegeId, 'trying fallback formats');
      // Try to match with different collegeId formats
      const fallbackIds = ['COL001', 'college_1', collegeId.toLowerCase(), collegeId.toUpperCase()];
      for (const fallbackId of fallbackIds) {
        const fallbackStudents = mockCollegeStudents.filter(student => student.collegeId === fallbackId);
        if (fallbackStudents.length > 0) {
          filteredStudents = fallbackStudents;
          console.log('getFilteredStudents - Found students with fallbackId:', fallbackId);
          break;
        }
      }
    }
    
    console.log('getFilteredStudents - initial students count:', filteredStudents.length);

    // Apply each filter safely - only apply if filter has a value
    // Skills filter (multi-select)
    if (filters.skills && filters.skills.length > 0) {
      filteredStudents = filteredStudents.filter(student => 
        filters.skills!.some(skill => 
          student.skills.some(studentSkill => 
            studentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
      console.log('getFilteredStudents - after skills filter:', filteredStudents.length);
    }

    // Certifications filter (multi-select)
    if (filters.certifications && filters.certifications.length > 0) {
      filteredStudents = filteredStudents.filter(student => 
        filters.certifications!.some(certFilter =>
          student.certifications.some(cert =>
            cert.name.toLowerCase().includes(certFilter.toLowerCase()) ||
            cert.issuer.toLowerCase().includes(certFilter.toLowerCase())
          )
        )
      );
      console.log('getFilteredStudents - after certifications filter:', filteredStudents.length);
    }

    // AI Score range filter
    if (filters.minAIScore !== undefined) {
      filteredStudents = filteredStudents.filter(student => 
        (student.aiScore || 0) >= filters.minAIScore!
      );
      console.log('getFilteredStudents - after minAIScore filter:', filteredStudents.length);
    }

    if (filters.maxAIScore !== undefined) {
      filteredStudents = filteredStudents.filter(student => 
        (student.aiScore || 0) <= filters.maxAIScore!
      );
      console.log('getFilteredStudents - after maxAIScore filter:', filteredStudents.length);
    }

    // Branch filter (multi-select)
    if (filters.branch && filters.branch.length > 0) {
      filteredStudents = filteredStudents.filter(student => 
        filters.branch!.some(branch =>
          student.branch.toLowerCase().includes(branch.toLowerCase())
        )
      );
      console.log('getFilteredStudents - after branch filter:', filteredStudents.length);
    }

    // Year filter (multi-select)
    if (filters.year && filters.year.length > 0) {
      filteredStudents = filteredStudents.filter(student => 
        filters.year!.includes(student.year)
      );
      console.log('getFilteredStudents - after year filter:', filteredStudents.length);
    }

    // Status filter (multi-select)
    if (filters.status && filters.status.length > 0) {
      filteredStudents = filteredStudents.filter(student => 
        student.status && filters.status!.includes(student.status)
      );
      console.log('getFilteredStudents - after status filter:', filteredStudents.length);
    }

    // Project Experience filter (>= check)
    if (filters.minProjectExperience !== undefined) {
      filteredStudents = filteredStudents.filter(student => 
        (student.projectExperience || 0) >= filters.minProjectExperience!
      );
      console.log('getFilteredStudents - after minProjectExperience filter:', filteredStudents.length);
    }

    // Skill Match filter (>= check)
    if (filters.minSkillMatch !== undefined) {
      filteredStudents = filteredStudents.filter(student => 
        (student.skillMatch || 0) >= filters.minSkillMatch!
      );
      console.log('getFilteredStudents - after minSkillMatch filter:', filteredStudents.length);
    }

    // Custom ranking
    if (filters.customRank) {
      if (filters.customRank === 'topN') {
        // Sort by AI Score, then Skill Match (skill-first approach)
        filteredStudents.sort((a, b) => {
          const aScore = (a.aiScore || 0) + ((a.skillMatch || 0) * 0.5);
          const bScore = (b.aiScore || 0) + ((b.skillMatch || 0) * 0.5);
          return bScore - aScore;
        });
        // Keep top 10
        filteredStudents = filteredStudents.slice(0, 10);
      } else if (Array.isArray(filters.customRank)) {
        // Filter by specific student IDs
        filteredStudents = filteredStudents.filter(student => 
          filters.customRank!.includes(student.id)
        );
      }
      console.log('getFilteredStudents - after customRank filter:', filteredStudents.length);
    }

    // Default sorting by AI Score (skill-first approach)
    if (!filters.customRank) {
      filteredStudents.sort((a, b) => {
        const aScore = (a.aiScore || 0) + ((a.skillMatch || 0) * 0.5);
        const bScore = (b.aiScore || 0) + ((b.skillMatch || 0) * 0.5);
        return bScore - aScore;
      });
    }

    console.log('getFilteredStudents - final filtered students:', filteredStudents.length);

    // Return paginated response
    return createMockApiCall({
      data: filteredStudents,
      pagination: {
        page: 1,
        limit: filteredStudents.length,
        total: filteredStudents.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      }
    })();
  }
};
