import { useState, useEffect } from "react";
import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

// LocalStorage keys
const STORAGE_KEY = "recruiter_profile";

interface RecruiterProfileData {
  name: string;
  company: string;
  email: string;
  phone: string;
  position: string;
}

const getDefaultProfile = (): RecruiterProfileData => ({
  name: "Tech Recruiter",
  company: "Stealth AI",
  email: "recruiter@stealthai.com",
  phone: "+91 98765 43210",
  position: "Senior HR Manager",
});

const getRecruiterProfile = (): RecruiterProfileData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const defaultProfile = getDefaultProfile();
    saveRecruiterProfile(defaultProfile);
    return defaultProfile;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultProfile();
  }
};

const saveRecruiterProfile = (profile: RecruiterProfileData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

const RecruiterProfile = () => {
  const [profile, setProfile] = useState<RecruiterProfileData>(getDefaultProfile());

  useEffect(() => {
    const savedProfile = getRecruiterProfile();
    setProfile(savedProfile);
  }, []);

  const handleSave = () => {
    saveRecruiterProfile(profile);
    toast.success("Profile updated successfully!");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <RecruiterLayout>
      <div className="container mx-auto px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Recruiter Profile</h1>
          <p className="text-lg text-muted-foreground font-medium">Manage your recruiter information</p>
        </div>

        <Card className="p-8 rounded-2xl shadow-xl bg-card/80 dark:bg-card backdrop-blur">
          <div className="flex items-center gap-6 mb-10">
            <Avatar className="w-28 h-28 ring-4 ring-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary via-secondary to-muted text-white text-3xl font-bold">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-extrabold mb-1">{profile.name}</h2>
              <p className="text-lg text-muted-foreground font-medium flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {profile.company}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="font-semibold">Company Name</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="font-semibold">Position</Label>
                <Input
                  id="position"
                  value={profile.position}
                  onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <Button onClick={handleSave} variant="glowPrimary" className="w-full rounded-xl mt-6">
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterProfile;
