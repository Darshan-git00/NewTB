// Mock data for the application

export const mockDrives = [
  {
    id: 1,
    company: "Stealth AI",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=stealthai",
    position: "AI Analyst",
    type: "Job",
    salary: "$400 - $1000",
    location: "Pune, India",
    skills: ["Python", "AI", "Data Analysis"],
    openings: 5,
    interviews: 3,
    status: "active",
    description: "Join our AI team to work on cutting-edge machine learning projects.",
  },
  {
    id: 2,
    company: "Highspeed Studios",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=highspeed",
    position: "Junior Software Engineer",
    type: "Internship",
    salary: "$500 - $1000",
    location: "Bangalore, India",
    skills: ["React", "Node.js", "MongoDB"],
    openings: 8,
    interviews: 5,
    status: "active",
    description: "Work with a fast-paced startup building innovative web applications.",
  },
  {
    id: 3,
    company: "Lunch Data Corp",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=lunchdata",
    position: "Database Engineer",
    type: "Job",
    salary: "$400 - $1000",
    location: "Delhi, India",
    skills: ["SQL", "PostgreSQL", "Data Modeling"],
    openings: 3,
    interviews: 2,
    status: "active",
    description: "Design and optimize database systems for large-scale applications.",
  },
];

export const mockApplications = [
  {
    id: 1,
    driveId: 1,
    company: "Stealth AI",
    position: "AI Analyst",
    status: "under-review",
    appliedDate: "2024-01-15",
    lastUpdate: "2024-01-20",
  },
  {
    id: 2,
    driveId: 2,
    company: "Highspeed Studios",
    position: "Junior Software Engineer",
    status: "shortlisted",
    appliedDate: "2024-01-10",
    lastUpdate: "2024-01-22",
    interviewDate: "2024-01-28",
  },
  {
    id: 3,
    driveId: 3,
    company: "Lunch Data Corp",
    position: "Database Engineer",
    status: "rejected",
    appliedDate: "2024-01-05",
    lastUpdate: "2024-01-18",
  },
];

export const mockCompanies = [
  {
    id: 1,
    name: "Stealth AI",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=stealthai",
    activePositions: 3,
    totalHires: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Highspeed Studios",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=highspeed",
    activePositions: 5,
    totalHires: 8,
    status: "active",
  },
  {
    id: 3,
    name: "Lunch Data Corp",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=lunchdata",
    activePositions: 2,
    totalHires: 15,
    status: "active",
  },
];

export const mockStudents = [
  { id: 1, name: "Marcus Rashford", course: "B.Tech", branch: "Computer Science", year: "3rd", status: "available", cgpa: 8.5 },
  { id: 2, name: "Ryan Williams", course: "B.Tech", branch: "Information Technology", year: "2nd", status: "available", cgpa: 8.2 },
  { id: 3, name: "Kylan Mbappé", course: "M.Tech", branch: "Computer Science", year: "2nd", status: "placed", cgpa: 9.1 },
  { id: 4, name: "Jude Bellingham", course: "B.Tech", branch: "Electronics", year: "4th", status: "placed", cgpa: 8.8 },
  { id: 5, name: "Dean Huijsen", course: "BCA", branch: "Computer Science", year: "4th", status: "available", cgpa: 7.9 },
  { id: 6, name: "Antoine Semenyo", course: "MCA", branch: "Computer Science", year: "3rd", status: "placed", cgpa: 8.6 },
  { id: 7, name: "Ben Sesko", course: "B.Tech", branch: "Mechanical", year: "3rd", status: "on-hold", cgpa: 7.5 },
  { id: 8, name: "Dan James", course: "B.Tech", branch: "Computer Science", year: "3rd", status: "available", cgpa: 8.3 },
];

export const mockStats = {
  college: {
    totalStudents: 459,
    activeCompanies: 46,
    totalPositions: 57,
    placedStudents: 312,
  },
  student: {
    appliedDrives: 5,
    shortlisted: 2,
    pending: 3,
    cgpa: 8.4,
  },
  recruiter: {
    activeDrives: 3,
    totalApplications: 45,
    shortlisted: 12,
    hired: 5,
  },
};
