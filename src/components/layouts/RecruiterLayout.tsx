import { Link, useLocation } from "react-router-dom";
import { Briefcase, Users, Building2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RecruiterLayoutProps {
  children: React.ReactNode;
}

const RecruiterLayout = ({ children }: RecruiterLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/recruiter/dashboard", label: "Dashboard", icon: Building2 },
    { path: "/recruiter/drives", label: "My Drives", icon: Briefcase },
    { path: "/recruiter/students", label: "Students", icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/recruiter/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">SKILL BRIDGE</span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className={isActive(item.path) ? "" : "text-muted-foreground"}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/recruiter/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/recruiter/profile">
                <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                  <AvatarFallback className="bg-primary text-white">TR</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default RecruiterLayout;
