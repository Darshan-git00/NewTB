import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, CheckCircle, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockStats } from "@/data/mockData";

const RecruiterDashboard = () => {
  const stats = [
    { label: "Active Drives", value: mockStats.recruiter.activeDrives, icon: Briefcase, color: "text-primary" },
    { label: "Total Applications", value: mockStats.recruiter.totalApplications, icon: Users, color: "text-secondary" },
    { label: "Shortlisted", value: mockStats.recruiter.shortlisted, icon: CheckCircle, color: "text-success" },
    { label: "Hired", value: mockStats.recruiter.hired, icon: TrendingUp, color: "text-warning" },
  ];

  return (
    <RecruiterLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">Manage your recruitment drives</p>
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

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <Link to="/recruiter/drives/create">
                <Button variant="glowPrimary" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create New Drive
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/recruiter/students">
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    View Shortlisted Candidates
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Candidate Shortlisted</p>
                  <p className="text-xs text-muted-foreground">Marcus Rashford for AI Analyst position</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Application</p>
                  <p className="text-xs text-muted-foreground">5 new applications for Software Engineer role</p>
                  <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterDashboard;
