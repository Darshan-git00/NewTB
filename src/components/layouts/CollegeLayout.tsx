import { Link, useLocation } from "react-router-dom";
import { Building2, Users, Briefcase, Building, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CollegeLayoutProps {
  children: React.ReactNode;
}

const CollegeLayout = ({ children }: CollegeLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/college/dashboard", label: "Dashboard", icon: Building2 },
    { path: "/college/students", label: "Students", icon: Users },
    { path: "/college/drives", label: "Drives", icon: Briefcase },
    { path: "/college/companies", label: "Companies", icon: Building },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Navigation */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/college/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
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
              <Link to="/college/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/college/profile">
                <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                  <AvatarFallback className="bg-primary text-white">RC</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
};

export default CollegeLayout;
