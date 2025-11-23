import CollegeLayout from "@/components/layouts/CollegeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { mockDrives } from "@/data/mockData";

const CollegeDrives = () => {
  return (
    <CollegeLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Placement Drives</h1>
            <p className="text-muted-foreground">Manage all recruitment drives</p>
          </div>
          <Link to="/college/drives/create">
            <Button variant="glowPrimary">
              <Plus className="w-4 h-4" />
              Add New Position
            </Button>
          </Link>
        </div>

        <Card className="p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search drives by company or position..." className="pl-10" />
          </div>
        </Card>

        <div className="grid gap-6">
          {mockDrives.map((drive) => (
            <Card key={drive.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src={drive.logo} alt={drive.company} className="w-16 h-16 rounded-xl" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{drive.position}</h3>
                    <p className="text-muted-foreground mb-3">{drive.company}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {drive.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {drive.type}
                      </span>
                      <span className="font-semibold text-primary">{drive.salary}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {drive.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{drive.openings}</p>
                    <p className="text-xs text-muted-foreground">Total Openings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">{drive.interviews}</p>
                    <p className="text-xs text-muted-foreground">Interviews</p>
                  </div>
                  <Button>View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CollegeLayout>
  );
};

export default CollegeDrives;
