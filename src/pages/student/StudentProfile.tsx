import StudentLayout from "@/components/layouts/StudentLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, GraduationCap, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const StudentProfile = () => {
  const skills = ["Python", "React", "Node.js", "MongoDB", "TypeScript", "Java"];

  return (
    <StudentLayout>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Card className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-white text-2xl">JS</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold mb-2">John Sharma</h1>
                <p className="text-muted-foreground mb-3">B.Tech Computer Science • 3rd Year</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    john.sharma@student.edu
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    +91 98765 43210
                  </span>
                </div>
              </div>
            </div>
            <Link to="/student/profile/edit">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Academic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Course</p>
                  <p className="font-semibold">B.Tech Computer Science</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Current CGPA</p>
                  <p className="font-semibold text-primary text-xl">8.4</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Year</p>
                  <p className="font-semibold">3rd Year</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Branch</p>
                  <p className="font-semibold">Computer Science</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Certifications</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium mb-1">AWS Cloud Practitioner</h4>
                  <p className="text-sm text-muted-foreground">Amazon Web Services • 2024</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-medium mb-1">React Advanced Certification</h4>
                  <p className="text-sm text-muted-foreground">Meta • 2023</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentProfile;
