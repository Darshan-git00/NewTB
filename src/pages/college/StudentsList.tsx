import CollegeLayout from "@/components/layouts/CollegeLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star } from "lucide-react";
import StudentFilters from "@/components/StudentFilters";
import { mockStudents } from "@/data/mockData";

const StudentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    course: "all",
    branch: "all",
    status: "all",
    year: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      course: "all",
      branch: "all",
      status: "all",
      year: "all",
    });
    setSearchQuery("");
  };

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filters.course === "all" || student.course.toLowerCase().includes(filters.course);
    const matchesBranch = filters.branch === "all" || student.branch.toLowerCase().includes(filters.branch);
    const matchesStatus = filters.status === "all" || student.status === filters.status;
    const matchesYear = filters.year === "all" || student.year.includes(filters.year);

    return matchesSearch && matchesCourse && matchesBranch && matchesStatus && matchesYear;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-success/10 text-success border-success/20";
      case "placed": return "bg-primary/10 text-primary border-primary/20";
      case "on-hold": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted";
    }
  };

  return (
    <CollegeLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Students List</h1>
          <p className="text-muted-foreground">Manage and filter student data</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <StudentFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </Card>

        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{student.name}</h3>
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{student.branch}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="outline" className={getStatusColor(student.status)}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-primary font-semibold">{student.year}</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredStudents.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No students found matching your filters</p>
            </Card>
          )}
        </div>
      </div>
    </CollegeLayout>
  );
};

export default StudentsList;

