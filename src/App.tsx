import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import CollegeAuth from "./pages/auth/CollegeAuth";
import StudentAuth from "./pages/auth/StudentAuth";
import RecruiterAuth from "./pages/auth/RecruiterAuth";
import StudentsList from "./pages/college/StudentsList";
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
          <Route path="/auth/college" element={<CollegeAuth />} />
          <Route path="/auth/student" element={<StudentAuth />} />
          <Route path="/auth/recruiter" element={<RecruiterAuth />} />
          <Route path="/college/students" element={<StudentsList />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
