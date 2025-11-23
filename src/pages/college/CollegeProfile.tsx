import CollegeLayout from "@/components/layouts/CollegeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const CollegeProfile = () => {
  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <CollegeLayout>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">College Profile</h1>
          <p className="text-muted-foreground">Manage your college information</p>
        </div>

        <div className="grid gap-6">
          <Card className="p-8">
            <div className="flex items-center gap-6 mb-8">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-white text-2xl">
                  <Building2 className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold mb-1">RVCE College</h2>
                <p className="text-muted-foreground">Bangalore</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name</Label>
                  <Input id="collegeName" defaultValue="RVCE College" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Bangalore" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@rvce.edu" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" defaultValue="https://rvce.edu" />
                </div>
              </div>

              <Button onClick={handleSave} variant="glowPrimary" className="w-full">
                Save Changes
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold text-primary">459</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold text-secondary">46</p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold text-success">312</p>
                <p className="text-sm text-muted-foreground">Placements</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </CollegeLayout>
  );
};

export default CollegeProfile;
