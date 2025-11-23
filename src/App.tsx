import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import CollegeAuth from "./pages/auth/CollegeAuth";
import StudentAuth from "./pages/auth/StudentAuth";
import RecruiterAuth from "./pages/auth/RecruiterAuth";

// College Pages
import CollegeDashboard from "./pages/college/CollegeDashboard";
import StudentsList from "./pages/college/StudentsList";
import CollegeDrives from "./pages/college/CollegeDrives";
import CreateDrive from "./pages/college/CreateDrive";
import CollegeCompanies from "./pages/college/CollegeCompanies";
import CollegeProfile from "./pages/college/CollegeProfile";
import CollegeSettings from "./pages/college/CollegeSettings";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentDrives from "./pages/student/StudentDrives";
import StudentApplications from "./pages/student/StudentApplications";
import StudentProfile from "./pages/student/StudentProfile";
import StudentSettings from "./pages/student/StudentSettings";

// Recruiter Pages
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterDrives from "./pages/recruiter/RecruiterDrives";
import RecruiterStudents from "./pages/recruiter/RecruiterStudents";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";
import RecruiterSettings from "./pages/recruiter/RecruiterSettings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          
          {/* Auth Routes */}
          <Route path="/auth/college" element={<CollegeAuth />} />
          <Route path="/auth/student" element={<StudentAuth />} />
          <Route path="/auth/recruiter" element={<RecruiterAuth />} />
          
          {/* College Routes */}
          <Route path="/college/dashboard" element={<CollegeDashboard />} />
          <Route path="/college/students" element={<StudentsList />} />
          <Route path="/college/drives" element={<CollegeDrives />} />
          <Route path="/college/drives/create" element={<CreateDrive />} />
          <Route path="/college/companies" element={<CollegeCompanies />} />
          <Route path="/college/profile" element={<CollegeProfile />} />
          <Route path="/college/settings" element={<CollegeSettings />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/drives" element={<StudentDrives />} />
          <Route path="/student/applications" element={<StudentApplications />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/profile/edit" element={<StudentProfile />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/drives" element={<RecruiterDrives />} />
          <Route path="/recruiter/drives/create" element={<CreateDrive />} />
          <Route path="/recruiter/students" element={<RecruiterStudents />} />
          <Route path="/recruiter/profile" element={<RecruiterProfile />} />
          <Route path="/recruiter/settings" element={<RecruiterSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
