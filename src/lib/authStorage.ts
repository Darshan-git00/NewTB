// Authentication data storage utilities using localStorage

export interface StudentAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  course: string;
  branch: string;
  year: string;
  cgpa: number;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  collegeId: string;
  collegeName: string;
  createdAt: string;
}

export interface CollegeAccount {
  id: string;
  collegeId: string; // Unique college identifier like CLG-XYZ123
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  website?: string;
  establishedYear: string;
  type: string; // Engineering, Medical, Arts, etc.
  accreditation?: string;
  totalStudents?: number;
  departments: string[];
  createdAt: string;
}

export interface RecruiterAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  company: string;
  position: string;
  department?: string;
  experience: string;
  linkedinProfile?: string;
  collegeId: string;
  collegeName: string;
  createdAt: string;
}

export interface AuthUser {
  type: "student" | "college" | "recruiter";
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEYS = {
  STUDENTS: "auth_students",
  COLLEGES: "auth_colleges", 
  RECRUITERS: "auth_recruiters",
  CURRENT_USER: "current_user",
  COLLEGE_IDS: "college_ids", // Track all generated college IDs
} as const;

// Generate unique college ID
export const generateCollegeId = (collegeName?: string): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let prefix = "CLG";
  
  // Use first 3 letters of college name if provided
  if (collegeName && collegeName.length >= 3) {
    prefix = collegeName.substring(0, 3).toUpperCase();
  }
  
  let result = `${prefix}-`;
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Check if college ID already exists
export const isCollegeIdUnique = (collegeId: string): boolean => {
  const existingIds = getCollegeIds();
  return !existingIds.includes(collegeId);
};

// Get all college IDs
export const getCollegeIds = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.COLLEGE_IDS);
  return stored ? JSON.parse(stored) : [];
};

// Save college ID
export const saveCollegeId = (collegeId: string): void => {
  const existingIds = getCollegeIds();
  existingIds.push(collegeId);
  localStorage.setItem(STORAGE_KEYS.COLLEGE_IDS, JSON.stringify(existingIds));
};

// Validate college ID exists
export const validateCollegeId = (collegeId: string): CollegeAccount | null => {
  const colleges = getColleges();
  return colleges.find(college => college.collegeId === collegeId) || null;
};

// Student functions
export const getStudents = (): StudentAccount[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  return stored ? JSON.parse(stored) : [];
};

export const saveStudent = (student: Omit<StudentAccount, "id" | "createdAt" | "collegeName">): StudentAccount => {
  const students = getStudents();
  
  // Fetch college name using collegeId
  const college = validateCollegeId(student.collegeId);
  const collegeName = college ? college.name : "Unknown College";
  
  const newStudent: StudentAccount = {
    ...student,
    collegeName,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  students.push(newStudent);
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  return newStudent;
};

export const getStudentByEmail = (email: string): StudentAccount | null => {
  const students = getStudents();
  return students.find(student => student.email === email) || null;
};

// College functions
export const getColleges = (): CollegeAccount[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.COLLEGES);
  const colleges = stored ? JSON.parse(stored) : [];
  console.log('getColleges - stored colleges:', colleges);
  return colleges;
};

export const saveCollege = (college: Omit<CollegeAccount, "id" | "collegeId" | "createdAt">): CollegeAccount => {
  const colleges = getColleges();
  
  // Generate unique college ID with college name prefix
  let collegeId: string;
  do {
    collegeId = generateCollegeId(college.name);
  } while (!isCollegeIdUnique(collegeId));
  
  const newCollege: CollegeAccount = {
    ...college,
    id: Date.now().toString(),
    collegeId,
    createdAt: new Date().toISOString(),
  };
  
  console.log('saveCollege - saving college:', newCollege);
  colleges.push(newCollege);
  localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(colleges));
  saveCollegeId(collegeId); // Save the generated ID
  return newCollege;
};

export const getCollegeByEmail = (email: string): CollegeAccount | null => {
  const colleges = getColleges();
  return colleges.find(college => college.email === email) || null;
};

// Recruiter functions
export const getRecruiters = (): RecruiterAccount[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.RECRUITERS);
  return stored ? JSON.parse(stored) : [];
};

export const saveRecruiter = (recruiter: Omit<RecruiterAccount, "id" | "createdAt" | "collegeName">): RecruiterAccount => {
  const recruiters = getRecruiters();
  
  // Fetch college name using collegeId
  const college = validateCollegeId(recruiter.collegeId);
  const collegeName = college ? college.name : "Unknown College";
  
  const newRecruiter: RecruiterAccount = {
    ...recruiter,
    collegeName,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  recruiters.push(newRecruiter);
  localStorage.setItem(STORAGE_KEYS.RECRUITERS, JSON.stringify(recruiters));
  return newRecruiter;
};

export const getRecruiterByEmail = (email: string): RecruiterAccount | null => {
  const recruiters = getRecruiters();
  return recruiters.find(recruiter => recruiter.email === email) || null;
};

// Authentication functions
export const login = (email: string, password: string, type: "student" | "college" | "recruiter"): AuthUser | null => {
  let user: StudentAccount | CollegeAccount | RecruiterAccount | null = null;
  
  switch (type) {
    case "student":
      user = getStudentByEmail(email);
      break;
    case "college":
      user = getCollegeByEmail(email);
      break;
    case "recruiter":
      user = getRecruiterByEmail(email);
      break;
  }
  
  if (user && user.password === password) {
    const authUser: AuthUser = {
      type,
      id: user.id,
      email: user.email,
      name: user.name,
    };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(authUser));
    return authUser;
  }
  
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const getCurrentUser = (): AuthUser | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return stored ? JSON.parse(stored) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const requireAuth = (type?: "student" | "college" | "recruiter"): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  if (type && user.type !== type) return false;
  return true;
};
