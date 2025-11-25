import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Award, Code, TrendingUp } from "lucide-react";
import { mockStudents } from "@/data/mockData";

export const StudentIntelligencePanel = () => {
  // Sort by custom rank (skills + certifications + AI interview)
  const rankedStudents = [...mockStudents]
    .filter(s => s.status === "available" || s.status === "on-hold")
    .sort((a, b) => {
      const scoreA = (a.aiInterviewScore || 0) + (a.skillMatchPercentage || 0) + ((a.certifications?.length || 0) * 10);
      const scoreB = (b.aiInterviewScore || 0) + (b.skillMatchPercentage || 0) + ((b.certifications?.length || 0) * 10);
      return scoreB - scoreA;
    })
    .slice(0, 5);

  return (
    <Card className="p-6 rounded-2xl bg-gradient-to-br from-card/90 dark:from-card via-primary/5 to-secondary/5 backdrop-blur shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Student Intelligence Panel</h3>
          <p className="text-sm text-muted-foreground">Top performers by skills & AI assessment</p>
        </div>
      </div>

      <div className="space-y-4">
        {rankedStudents.map((student, idx) => (
          <div
            key={student.id}
            className="p-4 rounded-xl bg-card/60 dark:bg-card/80 backdrop-blur border border-border/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-primary">#{idx + 1}</span>
                  <h4 className="font-semibold text-base">{student.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {student.branch}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {student.skills?.slice(0, 4).map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Brain className="w-3 h-3" />
                  AI Score
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={student.aiInterviewScore || 0} className="h-2 flex-1" />
                  <span className="text-sm font-bold text-primary">{student.aiInterviewScore || 0}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Code className="w-3 h-3" />
                  Skill Match
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={student.skillMatchPercentage || 0} className="h-2 flex-1" />
                  <span className="text-sm font-bold text-secondary">{student.skillMatchPercentage || 0}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Award className="w-3 h-3" />
                  Certifications
                </div>
                <span className="text-sm font-bold">{student.certifications?.length || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

