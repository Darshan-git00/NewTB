import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

const RecruiterProfile = () => {
  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <RecruiterLayout>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recruiter Profile</h1>
          <p className="text-muted-foreground">Manage your recruiter information</p>
        </div>

        <Card className="p-8">
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-white text-2xl">TR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold mb-1">Tech Recruiter</h2>
              <p className="text-muted-foreground">Stealth AI</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Tech Recruiter" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" defaultValue="Stealth AI" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="recruiter@stealthai.com" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" defaultValue="Senior HR Manager" />
              </div>
            </div>

            <Button onClick={handleSave} variant="glowPrimary" className="w-full">
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterProfile;
