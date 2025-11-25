import { ApiResponse, createMockApiCall, apiClient } from './api';
import { Student, Drive, Application, Interview, Notification, PaginatedResponse, PaginationParams } from './types';

// Mock data
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
      },
      {
        id: 'cert_2',
        name: 'Google Cloud Professional',
        issuer: 'Google',
        year: '2023',
        credentialId: 'GCP-789012'
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
        id: 'cert_3',
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
    nextRound: 'HR Interview',
    feedback: [
      {
        id: 'feedback_1',
        round: 'Online Test',
        feedback: 'Good problem solving skills',
        rating: 4,
        interviewerId: 'interviewer_1',
        interviewerName: 'John Interviewer',
        createdAt: '2024-01-11T15:00:00Z'
      }
    ]
  },
  {
    id: 'app_2',
    studentId: 'student_1',
    driveId: 'drive_2',
    driveTitle: 'Frontend Developer',
    company: 'Microsoft',
    status: 'shortlisted',
    appliedAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-14T11:30:00Z',
    currentRound: 'Coding Challenge',
    nextRound: 'System Design'
  }
];

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
  }
];

const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'student_1',
    type: 'drive',
    title: 'New Drive Posted',
    message: 'Google has posted a new Software Engineer Intern drive',
    isRead: false,
    actionUrl: '/student/drives/drive_1',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'notif_2',
    userId: 'student_1',
    type: 'application',
    title: 'Application Status Updated',
    message: 'Your application for Google has been shortlisted',
    isRead: false,
    actionUrl: '/student/applications/app_1',
    createdAt: '2024-01-14T15:30:00Z'
  }
];

// Student service functions
export const studentService = {
  // Profile management
  getProfile: async (studentId: string): Promise<ApiResponse<Student>> => {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    return createMockApiCall(student)();
  },

  updateProfile: async (studentId: string, data: Partial<Student>): Promise<ApiResponse<Student>> => {
    const studentIndex = mockStudents.findIndex(s => s.id === studentId);
    if (studentIndex === -1) {
      throw new Error('Student not found');
    }
    
    const updatedStudent = { ...mockStudents[studentIndex], ...data, updatedAt: new Date().toISOString() };
    mockStudents[studentIndex] = updatedStudent;
    
    return createMockApiCall(updatedStudent)();
  },

  // Drive management
  getDrives: async (params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Drive>>> => {
    let filteredDrives = [...mockDrives];
    
    if (params?.search) {
      filteredDrives = filteredDrives.filter(drive => 
        drive.title.toLowerCase().includes(params.search!.toLowerCase()) ||
        drive.company.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

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

  getDriveById: async (driveId: string): Promise<ApiResponse<Drive>> => {
    const drive = mockDrives.find(d => d.id === driveId);
    if (!drive) {
      throw new Error('Drive not found');
    }
    return createMockApiCall(drive)();
  },

  // Application management
  getApplications: async (studentId: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Application>>> => {
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

  applyToDrive: async (studentId: string, driveId: string, data: { resume?: string; coverLetter?: string }): Promise<ApiResponse<Application>> => {
    const drive = mockDrives.find(d => d.id === driveId);
    if (!drive) {
      throw new Error('Drive not found');
    }

    const existingApplication = mockApplications.find(app => app.studentId === studentId && app.driveId === driveId);
    if (existingApplication) {
      throw new Error('Already applied to this drive');
    }

    const newApplication: Application = {
      id: `app_${Date.now()}`,
      studentId,
      driveId,
      driveTitle: drive.title,
      company: drive.company,
      status: 'applied',
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resume: data.resume,
      coverLetter: data.coverLetter
    };

    mockApplications.push(newApplication);
    return createMockApiCall(newApplication)();
  },

  withdrawApplication: async (applicationId: string): Promise<ApiResponse<Application>> => {
    const appIndex = mockApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      throw new Error('Application not found');
    }

    const withdrawnApplication = { ...mockApplications[appIndex], status: 'withdrawn' as const, updatedAt: new Date().toISOString() };
    mockApplications[appIndex] = withdrawnApplication;
    
    return createMockApiCall(withdrawnApplication)();
  },

  // Interview management
  getInterviews: async (studentId: string): Promise<ApiResponse<Interview[]>> => {
    const studentInterviews = mockInterviews.filter(interview => interview.studentId === studentId);
    return createMockApiCall(studentInterviews)();
  },

  getInterviewById: async (interviewId: string): Promise<ApiResponse<Interview>> => {
    const interview = mockInterviews.find(i => i.id === interviewId);
    if (!interview) {
      throw new Error('Interview not found');
    }
    return createMockApiCall(interview)();
  },

  // Notifications
  getNotifications: async (studentId: string, params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Notification>>> => {
    let studentNotifications = mockNotifications.filter(notif => notif.userId === studentId);
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedNotifications = studentNotifications.slice(startIndex, endIndex);
    
    return createMockApiCall({
      data: paginatedNotifications,
      pagination: {
        page,
        limit,
        total: studentNotifications.length,
        totalPages: Math.ceil(studentNotifications.length / limit),
        hasNext: endIndex < studentNotifications.length,
        hasPrev: page > 1
      }
    })();
  },

  markNotificationAsRead: async (notificationId: string): Promise<ApiResponse<Notification>> => {
    const notifIndex = mockNotifications.findIndex(notif => notif.id === notificationId);
    if (notifIndex === -1) {
      throw new Error('Notification not found');
    }

    const readNotification = { ...mockNotifications[notifIndex], isRead: true };
    mockNotifications[notifIndex] = readNotification;
    
    return createMockApiCall(readNotification)();
  },

  // AI Interview
  startAIInterview: async (applicationId: string): Promise<ApiResponse<Interview>> => {
    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    const aiInterview: Interview = {
      id: `interview_ai_${Date.now()}`,
      applicationId,
      studentId: application.studentId,
      driveId: application.driveId,
      type: 'ai',
      round: 1,
      scheduledAt: new Date().toISOString(),
      duration: 45,
      status: 'in_progress'
    };

    mockInterviews.push(aiInterview);
    return createMockApiCall(aiInterview)();
  },

  submitAIInterview: async (interviewId: string, responses: any[]): Promise<ApiResponse<any>> => {
    const interview = mockInterviews.find(i => i.id === interviewId);
    if (!interview) {
      throw new Error('Interview not found');
    }

    // Mock AI analysis result
    const aiAnalysis = {
      overallScore: 85,
      technicalScore: 88,
      communicationScore: 82,
      confidenceScore: 86,
      clarityScore: 84,
      keyInsights: [
        'Strong problem-solving approach',
        'Good communication skills',
        'Well-structured answers'
      ],
      improvementAreas: [
        'Could improve on technical depth',
        'Consider adding more examples'
      ],
      strengths: [
        'Clear articulation',
        'Logical thinking',
        'Confidence in responses'
      ],
      transcript: responses,
      sentimentAnalysis: {
        positive: 0.75,
        neutral: 0.20,
        negative: 0.05
      },
      recommendations: [
        'Focus on technical preparation',
        'Practice more coding problems',
        'Work on explaining complex concepts'
      ]
    };

    interview.status = 'completed';
    interview.aiAnalysis = aiAnalysis;

    return createMockApiCall(aiAnalysis)();
  }
};
