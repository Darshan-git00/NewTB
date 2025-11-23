import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Eye } from "lucide-react";
import { mockStudents } from "@/data/mockData";

const RecruiterStudents = () => {
  // Filter only placed or shortlisted students for recruiter view
  const relevantStudents = mockStudents.filter(s => s.status === "placed" || s.status === "available");

  return (
    <RecruiterLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shortlisted Candidates</h1>
          <p className="text-muted-foreground">Review and manage candidate profiles</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search candidates..." className="pl-10" />
          </div>
        </Card>

        <div className="grid gap-4">
          {relevantStudents.map((student) => (
            <Card key={student.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{student.name}</h3>
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">{student.course} • {student.branch}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-primary">{student.cgpa}</p>
                    <p className="text-xs text-muted-foreground">CGPA</p>
                  </div>
                  <Badge variant="secondary">{student.year}</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button size="sm">
                      Shortlist
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterStudents;
