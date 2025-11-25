import CollegeLayout from "@/components/layouts/CollegeLayout";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Brain, Award, Code, Eye } from "lucide-react";
import { mockStudents } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const StudentsList = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Use mock students for now
  const students = mockStudents.slice(0, 6);
  
  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CollegeLayout>
      <div className="container mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Student Intelligence & Filtering</h1>
          <p className="text-lg text-muted-foreground font-medium">Filter and evaluate students by skills, certifications, and AI interview results</p>
        </div>

        {/* Search Bar */}
        <Card className="p-6 mb-6 rounded-2xl bg-card/70 dark:bg-card backdrop-blur shadow-xl">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, branch, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Students Grid */}
        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="p-6 rounded-xl hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{student.name}</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {student.status || 'Available'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{student.branch} • {student.year}</span>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-1">{student.course}</p>
                      <p className="text-sm font-medium">CGPA: {student.cgpa}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 5).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                        {student.skills.length > 5 && (
                          <Badge variant="outline" className="text-xs">+{student.skills.length - 5} more</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Brain className="w-3 h-3" />
                          AI Score
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={student.aiInterviewScore || 85} className="h-2 flex-1" />
                          <span className="text-sm font-bold text-primary">{student.aiInterviewScore || 85}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Code className="w-3 h-3" />
                          Skill Match
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={student.skillMatchPercentage || 90} className="h-2 flex-1" />
                          <span className="text-sm font-bold text-secondary">{student.skillMatchPercentage || 90}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Award className="w-3 h-3" />
                          Certifications
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={(student.certifications?.length || 3) * 20} className="h-2 flex-1" />
                          <span className="text-sm font-bold text-warning">{student.certifications?.length || 3}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="ml-4">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </Card>
          ))}

          {filteredStudents.length === 0 && (
            <Card className="p-12 text-center rounded-xl">
              <p className="text-muted-foreground">No students found matching "{searchQuery}"</p>
            </Card>
          )}
        </div>
      </div>
    </CollegeLayout>
  );
};

export default StudentsList;
