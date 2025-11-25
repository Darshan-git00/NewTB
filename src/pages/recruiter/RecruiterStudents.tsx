import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, Eye, CheckCircle, XCircle, Calendar, Plus } from "lucide-react";
import { getApplicants, updateApplicantStatus, addInterviewRound, updateInterviewRound, updateApplicantNotes, Applicant } from "@/lib/recruiterStorage";
import { getRecruiterDrives } from "@/lib/recruiterStorage";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { format } from "date-fns";

const RecruiterStudents = () => {
  const [searchParams] = useSearchParams();
  const applicantIdParam = searchParams.get("applicantId");
  
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [driveFilter, setDriveFilter] = useState("all");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isInterviewDialogOpen, setIsInterviewDialogOpen] = useState(false);
  const [interviewFormData, setInterviewFormData] = useState({
    roundNumber: 1,
    roundName: "",
    scheduledDate: "",
    status: "scheduled" as "scheduled" | "completed" | "cancelled",
    feedback: "",
    score: "",
  });
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadApplicants();
    if (applicantIdParam) {
      const applicant = applicants.find((a) => a.id === parseInt(applicantIdParam));
      if (applicant) {
        setSelectedApplicant(applicant);
        setIsProfileDialogOpen(true);
      }
    }
  }, [applicantIdParam]);

  useEffect(() => {
    filterApplicants();
  }, [applicants, searchQuery, statusFilter, driveFilter]);

  const loadApplicants = () => {
    const allApplicants = getApplicants();
    setApplicants(allApplicants);
  };

  const filterApplicants = () => {
    let filtered = [...applicants];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query) ||
          app.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Filter by drive
    if (driveFilter !== "all") {
      filtered = filtered.filter((app) => app.driveId === parseInt(driveFilter));
    }

    setFilteredApplicants(filtered);
  };

  const handleShortlist = (applicant: Applicant) => {
    updateApplicantStatus(applicant.id, "shortlisted");
    toast.success(`${applicant.name} has been shortlisted`);
    loadApplicants();
  };

  const handleReject = (applicant: Applicant) => {
    updateApplicantStatus(applicant.id, "rejected");
    toast.error(`${applicant.name} has been rejected`);
    loadApplicants();
  };

  const handleHire = (applicant: Applicant) => {
    updateApplicantStatus(applicant.id, "hired");
    toast.success(`Congratulations! ${applicant.name} has been hired`);
    loadApplicants();
  };

  const handleViewProfile = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setNotes(applicant.notes || "");
    setIsProfileDialogOpen(true);
  };

  const handleSaveNotes = () => {
    if (selectedApplicant) {
      updateApplicantNotes(selectedApplicant.id, notes);
      toast.success("Notes saved successfully");
      loadApplicants();
    }
  };

  const handleAddInterview = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    const existingRounds = applicant.interviewRounds || [];
    setInterviewFormData({
      roundNumber: existingRounds.length + 1,
      roundName: `Round ${existingRounds.length + 1}`,
      scheduledDate: "",
      status: "scheduled",
      feedback: "",
      score: "",
    });
    setIsInterviewDialogOpen(true);
  };

  const handleSaveInterview = () => {
    if (!selectedApplicant) return;

    addInterviewRound(selectedApplicant.id, {
      roundNumber: interviewFormData.roundNumber,
      roundName: interviewFormData.roundName,
      scheduledDate: interviewFormData.scheduledDate || undefined,
      status: interviewFormData.status,
      feedback: interviewFormData.feedback || undefined,
      score: interviewFormData.score ? parseInt(interviewFormData.score) : undefined,
    });

    toast.success("Interview round added successfully");
    setIsInterviewDialogOpen(false);
    loadApplicants();
  };

  const handleUpdateInterviewRound = (applicantId: number, roundId: number, updates: Partial<typeof interviewFormData>) => {
    updateInterviewRound(applicantId, roundId, {
      roundName: updates.roundName,
      scheduledDate: updates.scheduledDate,
      status: updates.status as "scheduled" | "completed" | "cancelled",
      feedback: updates.feedback,
      score: updates.score ? parseInt(updates.score) : undefined,
    });
    toast.success("Interview round updated");
    loadApplicants();
  };

  const drives = getRecruiterDrives();
  const getDriveName = (driveId: number) => {
    const drive = drives.find((d) => d.id === driveId);
    return drive ? `${drive.position} at ${drive.company}` : "Unknown Drive";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shortlisted":
        return "bg-success/10 text-success border-success/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "hired":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted";
    }
  };

  return (
    <RecruiterLayout>
      <div className="container mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Shortlisted Candidates</h1>
          <p className="text-lg text-muted-foreground font-medium">Review and manage candidate profiles</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6 rounded-2xl">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={driveFilter} onValueChange={setDriveFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Drives" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Drives</SelectItem>
                  {drives.map((drive) => (
                    <SelectItem key={drive.id} value={drive.id.toString()}>
                      {drive.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(searchQuery || statusFilter !== "all" || driveFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setDriveFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Applicants List */}
        <div className="grid gap-5">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant, idx) => (
              <motion.div
                key={applicant.id}
                className="card-hover"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.08, duration: 0.35, ease: 'easeOut' }}
              >
                <Card className="p-6 rounded-2xl hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${applicant.name}`} />
                        <AvatarFallback className="bg-gradient-to-br from-primary via-secondary to-muted text-white text-lg font-medium">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{applicant.name}</h3>
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <Badge className={getStatusColor(applicant.status)}>
                            {applicant.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {applicant.course} • {applicant.branch} • {applicant.year}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied for: {getDriveName(applicant.driveId)}
                        </p>
                        {applicant.interviewRounds && applicant.interviewRounds.length > 0 && (
                          <p className="text-xs text-primary mt-1">
                            {applicant.interviewRounds.length} interview round(s) scheduled
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xl font-bold text-primary">{applicant.cgpa}</p>
                        <p className="text-xs text-muted-foreground">CGPA</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handleViewProfile(applicant)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                        {applicant.status === "applied" && (
                          <>
                            <Button
                              size="sm"
                              className="rounded-xl bg-success hover:bg-success/90"
                              onClick={() => handleShortlist(applicant)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Shortlist
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="rounded-xl"
                              onClick={() => handleReject(applicant)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        {applicant.status === "shortlisted" && (
                          <>
                            <Button
                              size="sm"
                              className="rounded-xl"
                              onClick={() => handleAddInterview(applicant)}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Add Interview
                            </Button>
                            <Button
                              size="sm"
                              variant="glowPrimary"
                              className="rounded-xl"
                              onClick={() => handleHire(applicant)}
                            >
                              Hire
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="p-12 text-center rounded-2xl">
              <p className="text-muted-foreground text-lg">
                {searchQuery || statusFilter !== "all" || driveFilter !== "all"
                  ? "No candidates found matching your criteria."
                  : "No candidates yet."}
              </p>
            </Card>
          )}
        </div>

        {/* Profile Dialog */}
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedApplicant && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedApplicant.name} - Profile</DialogTitle>
                  <DialogDescription>
                    {getDriveName(selectedApplicant.driveId)}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedApplicant.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CGPA</p>
                      <p className="font-medium">{selectedApplicant.cgpa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Course</p>
                      <p className="font-medium">{selectedApplicant.course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Branch</p>
                      <p className="font-medium">{selectedApplicant.branch}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-medium">{selectedApplicant.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(selectedApplicant.status)}>
                        {selectedApplicant.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {selectedApplicant.interviewRounds && selectedApplicant.interviewRounds.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Interview Rounds</p>
                      <div className="space-y-2">
                        {selectedApplicant.interviewRounds.map((round) => (
                          <Card key={round.id} className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{round.roundName}</p>
                                {round.scheduledDate && (
                                  <p className="text-sm text-muted-foreground">
                                    Scheduled: {format(new Date(round.scheduledDate), "MMM dd, yyyy")}
                                  </p>
                                )}
                                {round.feedback && (
                                  <p className="text-sm mt-1">Feedback: {round.feedback}</p>
                                )}
                                {round.score && (
                                  <p className="text-sm mt-1">Score: {round.score}/100</p>
                                )}
                              </div>
                              <Badge
                                variant={
                                  round.status === "completed"
                                    ? "default"
                                    : round.status === "cancelled"
                                    ? "destructive"
                                    : "outline"
                                }
                              >
                                {round.status}
                              </Badge>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="mb-2">Notes</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this candidate..."
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={handleSaveNotes}>Save Notes</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Interview Dialog */}
        <Dialog open={isInterviewDialogOpen} onOpenChange={setIsInterviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview Round</DialogTitle>
              <DialogDescription>
                Add a new interview round for {selectedApplicant?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Round Name</Label>
                <Input
                  value={interviewFormData.roundName}
                  onChange={(e) =>
                    setInterviewFormData({ ...interviewFormData, roundName: e.target.value })
                  }
                  placeholder="e.g., Technical Round, HR Round"
                />
              </div>
              <div className="space-y-2">
                <Label>Scheduled Date</Label>
                <Input
                  type="datetime-local"
                  value={interviewFormData.scheduledDate}
                  onChange={(e) =>
                    setInterviewFormData({ ...interviewFormData, scheduledDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={interviewFormData.status}
                  onValueChange={(value) =>
                    setInterviewFormData({
                      ...interviewFormData,
                      status: value as "scheduled" | "completed" | "cancelled",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {interviewFormData.status === "completed" && (
                <>
                  <div className="space-y-2">
                    <Label>Feedback</Label>
                    <Textarea
                      value={interviewFormData.feedback}
                      onChange={(e) =>
                        setInterviewFormData({ ...interviewFormData, feedback: e.target.value })
                      }
                      placeholder="Interview feedback..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Score (out of 100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={interviewFormData.score}
                      onChange={(e) =>
                        setInterviewFormData({ ...interviewFormData, score: e.target.value })
                      }
                      placeholder="e.g., 85"
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInterviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveInterview}>Save Interview</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterStudents;
