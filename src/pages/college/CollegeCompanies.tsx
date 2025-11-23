import CollegeLayout from "@/components/layouts/CollegeLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Building2 } from "lucide-react";
import { mockCompanies } from "@/data/mockData";

const CollegeCompanies = () => {
  return (
    <CollegeLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Companies</h1>
            <p className="text-muted-foreground">Manage recruiting companies</p>
          </div>
          <Button variant="glowPrimary">
            <Plus className="w-4 h-4" />
            Add Company
          </Button>
        </div>

        <Card className="p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search companies..." className="pl-10" />
          </div>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompanies.map((company) => (
            <Card key={company.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {company.status}
                  </Badge>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Positions</span>
                      <span className="font-semibold text-primary">{company.activePositions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Hires</span>
                      <span className="font-semibold">{company.totalHires}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CollegeLayout>
  );
};

export default CollegeCompanies;
