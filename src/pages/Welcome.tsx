import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, GraduationCap, Briefcase } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            SKILL<br />BRIDGE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">
            Connecting talent to opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link to="/auth/college" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">College</h3>
              <p className="text-white/80 text-sm">Manage placements and connect students with opportunities</p>
            </div>
          </Link>

          <Link to="/auth/student" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Student</h3>
              <p className="text-white/80 text-sm">Find your dream job and track your applications</p>
            </div>
          </Link>

          <Link to="/auth/recruiter" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Recruiter</h3>
              <p className="text-white/80 text-sm">Discover talented candidates for your company</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
