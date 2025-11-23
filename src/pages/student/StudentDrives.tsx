import StudentLayout from "@/components/layouts/StudentLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase, Building } from "lucide-react";
import { mockDrives } from "@/data/mockData";
import { toast } from "sonner";

const StudentDrives = () => {
  const handleApply = (driveName: string) => {
    toast.success(`Applied to ${driveName} successfully!`);
  };

  return (
    <StudentLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Drives</h1>
          <p className="text-muted-foreground">Find your perfect opportunity</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by company or position..." className="pl-10" />
          </div>
        </Card>

        <div className="grid gap-6">
          {mockDrives.map((drive) => (
            <Card key={drive.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <img src={drive.logo} alt={drive.company} className="w-16 h-16 rounded-xl" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{drive.position}</h3>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {drive.company}
                        </p>
                      </div>
                      <Badge variant={drive.type === "Job" ? "default" : "secondary"}>
                        {drive.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {drive.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {drive.openings} openings
                      </span>
                      <span className="font-semibold text-primary">{drive.salary}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{drive.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {drive.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <Button onClick={() => handleApply(drive.position)} variant="glowPrimary">
                    Apply Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDrives;
