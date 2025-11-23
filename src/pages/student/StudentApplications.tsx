import StudentLayout from "@/components/layouts/StudentLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Calendar, Eye } from "lucide-react";
import { mockApplications } from "@/data/mockData";

const StudentApplications = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted": return "bg-success/10 text-success border-success/20";
      case "under-review": return "bg-warning/10 text-warning border-warning/20";
      case "rejected": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted";
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <StudentLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track your application status</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockApplications.map((application) => (
              <Card key={application.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{application.position}</h3>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {application.company}
                        </p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(application.status)}>
                        {formatStatus(application.status)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Applied: {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Last Update: {new Date(application.lastUpdate).toLocaleDateString()}
                      </span>
                      {application.interviewDate && (
                        <span className="flex items-center gap-1 text-primary font-semibold">
                          <Calendar className="w-4 h-4" />
                          Interview: {new Date(application.interviewDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="ml-4">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {mockApplications
              .filter((app) => app.status === "under-review")
              .map((application) => (
                <Card key={application.id} className="p-6">
                  <h3 className="font-semibold">{application.position}</h3>
                  <p className="text-sm text-muted-foreground">{application.company}</p>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="shortlisted" className="space-y-4">
            {mockApplications
              .filter((app) => app.status === "shortlisted")
              .map((application) => (
                <Card key={application.id} className="p-6">
                  <h3 className="font-semibold">{application.position}</h3>
                  <p className="text-sm text-muted-foreground">{application.company}</p>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {mockApplications
              .filter((app) => app.status === "rejected")
              .map((application) => (
                <Card key={application.id} className="p-6">
                  <h3 className="font-semibold">{application.position}</h3>
                  <p className="text-sm text-muted-foreground">{application.company}</p>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default StudentApplications;
