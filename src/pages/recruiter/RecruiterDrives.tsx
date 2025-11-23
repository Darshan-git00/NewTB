import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { mockDrives } from "@/data/mockData";

const RecruiterDrives = () => {
  return (
    <RecruiterLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Drives</h1>
            <p className="text-muted-foreground">Manage your recruitment drives</p>
          </div>
          <Link to="/recruiter/drives/create">
            <Button variant="glowPrimary">
              <Plus className="w-4 h-4" />
              Create New Drive
            </Button>
          </Link>
        </div>

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
                          <MapPin className="w-4 h-4" />
                          {drive.location}
                        </p>
                      </div>
                      <Badge variant="secondary">{drive.type}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{drive.description}</p>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{drive.openings}</p>
                        <p className="text-xs text-muted-foreground">Openings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-secondary">{drive.interviews}</p>
                        <p className="text-xs text-muted-foreground">Interviews</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button size="sm">View Applications</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterDrives;
