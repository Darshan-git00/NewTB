import CollegeLayout from "@/components/layouts/CollegeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, Briefcase, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockStats, mockDrives } from "@/data/mockData";

const CollegeDashboard = () => {
  const stats = [
    { label: "Total Students", value: mockStats.college.totalStudents, icon: Users, color: "text-primary" },
    { label: "Active Companies", value: mockStats.college.activeCompanies, icon: Building, color: "text-secondary" },
    { label: "Total Positions", value: mockStats.college.totalPositions, icon: Briefcase, color: "text-success" },
    { label: "Placed Students", value: mockStats.college.placedStudents, icon: TrendingUp, color: "text-warning" },
  ];

  return (
    <CollegeLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Placement Dashboard</h1>
          <p className="text-muted-foreground">Academic Year 2024-25</p>
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

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <Link to="/college/companies">
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Add HR / Company
                  </span>
                  <Plus className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/college/drives/create">
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Add Position
                  </span>
                  <Plus className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/college/students">
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    View Students
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Position Added</p>
                  <p className="text-xs text-muted-foreground">Software Engineer at Highspeed Studios</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Student Placement</p>
                  <p className="text-xs text-muted-foreground">Marcus Rashford placed at Stealth AI</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Company Registered</p>
                  <p className="text-xs text-muted-foreground">Lunch Data Corp joined the platform</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Drives */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Active Drives</h2>
            <Link to="/college/drives">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {mockDrives.slice(0, 3).map((drive) => (
              <div key={drive.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={drive.logo} alt={drive.company} className="w-12 h-12 rounded-lg" />
                  <div>
                    <h3 className="font-semibold">{drive.position}</h3>
                    <p className="text-sm text-muted-foreground">{drive.company} • {drive.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{drive.openings}</p>
                    <p className="text-xs text-muted-foreground">Openings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{drive.interviews}</p>
                    <p className="text-xs text-muted-foreground">Interviews</p>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </CollegeLayout>
  );
};

export default CollegeDashboard;
