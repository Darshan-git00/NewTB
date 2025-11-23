import StudentLayout from "@/components/layouts/StudentLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockDrives, mockStats } from "@/data/mockData";

const StudentDashboard = () => {
  const stats = [
    { label: "Applied", value: mockStats.student.appliedDrives, icon: FileText, color: "text-primary" },
    { label: "Shortlisted", value: mockStats.student.shortlisted, icon: TrendingUp, color: "text-success" },
    { label: "Pending", value: mockStats.student.pending, icon: Briefcase, color: "text-warning" },
    { label: "CGPA", value: mockStats.student.cgpa, icon: TrendingUp, color: "text-secondary" },
  ];

  return (
    <StudentLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Find your next opportunity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Available Drives */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Available Drives</h2>
            <Link to="/student/drives">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {mockDrives.slice(0, 3).map((drive) => (
              <div key={drive.id} className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex gap-4">
                  <img src={drive.logo} alt={drive.company} className="w-12 h-12 rounded-lg" />
                  <div>
                    <h3 className="font-semibold mb-1">{drive.position}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{drive.company}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {drive.location}
                      </span>
                      <span className="font-semibold text-primary">{drive.salary}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {drive.skills.slice(0, 2).map((skill, idx) => (
                    <Badge key={idx} variant="secondary">{skill}</Badge>
                  ))}
                  <Button size="sm">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Profile Completion */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">Add your skills and experience to get better matches</p>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground">60% Complete</p>
            </div>
            <Link to="/student/profile/edit">
              <Button variant="glowPrimary">
                Complete Profile
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
