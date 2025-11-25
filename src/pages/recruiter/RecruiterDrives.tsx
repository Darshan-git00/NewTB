import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterLayout from "@/components/layouts/RecruiterLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MapPin, Users, Edit, Trash2, Eye, Search, Calendar, Clock, Video, MapPin as MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { getRecruiterDrives, deleteRecruiterDrive, updateRecruiterDrive, RecruiterDrive, getApplicants } from "@/lib/recruiterStorage";
import { useDriveApplications, useUpdateApplicationStatus, useScheduleInterview } from "@/hooks";
import { StatusChip } from "@/components/ui/StatusChip";
import { InterviewDetailsCard } from "@/components/ui/InterviewDetailsCard";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Application, InterviewDetails } from "@/services/types";

const RecruiterDrives = () => {
  const navigate = useNavigate();
  const [drives, setDrives] = useState<RecruiterDrive[]>([]);
  const [filteredDrives, setFilteredDrives] = useState<RecruiterDrive[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDrive, setSelectedDrive] = useState<RecruiterDrive | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewApplicantsDialogOpen, setIsViewApplicantsDialogOpen] = useState(false);
  const [isScheduleInterviewDialogOpen, setIsScheduleInterviewDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<RecruiterDrive>>({});
  const [interviewForm, setInterviewForm] = useState<InterviewDetails>({
    date: '',
    time: '',
    mode: 'online',
    link: ''
  });

  // React Query hooks for recruiter actions
  const updateApplicationStatusMutation = useUpdateApplicationStatus();
  const scheduleInterviewMutation = useScheduleInterview();

  useEffect(() => {
    loadDrives();
  }, []);

  useEffect(() => {
    filterDrives();
  }, [drives, searchQuery, statusFilter]);

  const loadDrives = () => {
    const recruiterDrives = getRecruiterDrives();
    setDrives(recruiterDrives);
  };

  const filterDrives = () => {
    let filtered = [...drives];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (drive) =>
          drive.position.toLowerCase().includes(query) ||
          drive.company.toLowerCase().includes(query) ||
          drive.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((drive) => drive.status === statusFilter);
    }

    setFilteredDrives(filtered);
  };

  const handleEdit = (drive: RecruiterDrive) => {
    setSelectedDrive(drive);
    setEditFormData({
      position: drive.position,
      type: drive.type,
      description: drive.description,
      skills: Array.isArray(drive.skills) ? drive.skills.join(", ") : drive.skills,
      company: drive.company,
      location: drive.location,
      salary: drive.salary,
      openings: drive.openings,
      experienceLevel: drive.experienceLevel,
      workMode: drive.workMode,
      applicationDeadline: drive.applicationDeadline,
      status: drive.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedDrive) return;

    const skills = editFormData.skills && typeof editFormData.skills === 'string'
      ? editFormData.skills.split(",").map((s) => s.trim()).filter((s) => s)
      : selectedDrive.skills;

    updateRecruiterDrive(selectedDrive.id, {
      ...editFormData,
      skills: skills,
    });

    toast.success("Drive updated successfully!");
    setIsEditDialogOpen(false);
    setSelectedDrive(null);
    loadDrives();
  };

  const handleDelete = (drive: RecruiterDrive) => {
    deleteRecruiterDrive(drive.id);
    toast.success("Drive deleted successfully!");
    setIsDeleteDialogOpen(false);
    loadDrives();
  };

  const handleViewApplicants = (drive: RecruiterDrive) => {
    setSelectedDrive(drive);
    setIsViewApplicantsDialogOpen(true);
  };

  const getApplicantsForDrive = (driveId: number) => {
    return getApplicants().filter((app) => app.driveId === driveId);
  };

  // Recruiter action handlers
  const handleUpdateApplicationStatus = (applicationId: string, newStatus: Application['status']) => {
    updateApplicationStatusMutation.mutate(
      { applicationId, newStatus },
      {
        onSuccess: () => {
          toast.success(`Application status updated to ${newStatus.replace('_', ' ')}`);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to update application status");
        }
      }
    );
  };

  const handleScheduleInterview = (application: Application) => {
    setSelectedApplication(application);
    setIsScheduleInterviewDialogOpen(true);
  };

  const handleSubmitInterview = () => {
    if (!selectedApplication || !interviewForm.date || !interviewForm.time) {
      toast.error("Please fill in all required interview details");
      return;
    }

    scheduleInterviewMutation.mutate(
      { 
        applicationId: selectedApplication.id, 
        interviewDetails: interviewForm 
      },
      {
        onSuccess: () => {
          toast.success("Interview scheduled successfully!");
          setIsScheduleInterviewDialogOpen(false);
          setInterviewForm({ date: '', time: '', mode: 'online', link: '' });
          setSelectedApplication(null);
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to schedule interview");
        }
      }
    );
  };

  // Get applications for the selected drive using React Query
  const { data: driveApplications = [] } = useDriveApplications(selectedDrive?.id.toString() || '');

  return (
    <RecruiterLayout>
      <div className="container mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">My Drives</h1>
            <p className="text-lg text-muted-foreground font-medium">Manage your recruitment drives</p>
          </div>
          <Link to="/recruiter/drives/create">
            <Button variant="glowPrimary" className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create New Drive
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6 rounded-2xl">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search drives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Drives List */}
        <div className="grid gap-6">
          {filteredDrives.length > 0 ? (
            filteredDrives.map((drive, idx) => {
              const applicants = getApplicantsForDrive(drive.id);
              return (
                <motion.div
                  key={drive.id}
                  className="card-hover"
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.08, duration: 0.35, ease: 'easeOut' }}
                >
                  <Card className="p-6 rounded-2xl hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <img
                          src={drive.logo}
                          alt={drive.company}
                          className="w-16 h-16 rounded-xl shadow-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold">{drive.position}</h3>
                            <Badge variant={drive.type === "Job" ? "default" : "secondary"}>
                              {drive.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                drive.status === "active"
                                  ? "bg-success/10 text-success border-success/20"
                                  : drive.status === "closed"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-warning/10 text-warning border-warning/20"
                              }
                            >
                              {drive.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4" />
                            {drive.location}
                          </p>

                          <p className="text-sm text-muted-foreground mb-4">{drive.description}</p>

                          <div className="flex items-center gap-6">
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-primary">{drive.openings}</p>
                              <p className="text-xs text-muted-foreground">Openings</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-secondary">{applicants.length}</p>
                              <p className="text-xs text-muted-foreground">Applicants</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-success">{drive.shortlisted}</p>
                              <p className="text-xs text-muted-foreground">Shortlisted</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-warning">{drive.interviews}</p>
                              <p className="text-xs text-muted-foreground">Interviews</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handleViewApplicants(drive)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Applications ({applicants.length})
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => handleEdit(drive)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <AlertDialog open={isDeleteDialogOpen && selectedDrive?.id === drive.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (!open) setSelectedDrive(null);
                        }}>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-xl"
                              onClick={() => {
                                setSelectedDrive(drive);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the drive and all associated applications. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => selectedDrive && handleDelete(selectedDrive)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <Card className="p-12 text-center rounded-2xl">
              <p className="text-muted-foreground text-lg">
                {searchQuery || statusFilter !== "all"
                  ? "No drives found matching your criteria."
                  : "No drives yet. Create your first drive to get started!"}
              </p>
            </Card>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Drive</DialogTitle>
              <DialogDescription>Update drive information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={editFormData.position || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, position: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={editFormData.type || "Job"}
                    onValueChange={(value) => setEditFormData({ ...editFormData, type: value as "Job" | "Internship" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Job">Job</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editFormData.status || "active"}
                    onValueChange={(value) => setEditFormData({ ...editFormData, status: value as "active" | "closed" | "draft" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editFormData.description || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Skills (comma separated)</Label>
                <Input
                  value={Array.isArray(editFormData.skills) ? editFormData.skills.join(", ") : (editFormData.skills || "")}
                  onChange={(e) => setEditFormData({ ...editFormData, skills: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={editFormData.location || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Salary</Label>
                  <Input
                    value={editFormData.salary || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, salary: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Openings</Label>
                  <Input
                    type="number"
                    value={editFormData.openings || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, openings: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Work Mode</Label>
                  <Select
                    value={editFormData.workMode || "Hybrid"}
                    onValueChange={(value) => setEditFormData({ ...editFormData, workMode: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Applicants Dialog */}
        <Dialog open={isViewApplicantsDialogOpen} onOpenChange={setIsViewApplicantsDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Applications for {selectedDrive?.position} at {selectedDrive?.company}
              </DialogTitle>
              <DialogDescription>
                View and manage applications for this drive ({driveApplications.length} applications)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {driveApplications.length > 0 ? (
                driveApplications.map((application) => (
                  <Card key={application.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold">{application.studentId}</h4>
                          <StatusChip status={application.status} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Applied: {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                        {application.interviewDetails && (
                          <InterviewDetailsCard interviewDetails={application.interviewDetails} className="mb-2" />
                        )}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateApplicationStatus(application.id, 'shortlisted')}
                          disabled={updateApplicationStatusMutation.isPending}
                        >
                          Shortlist
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateApplicationStatus(application.id, 'on_hold')}
                          disabled={updateApplicationStatusMutation.isPending}
                        >
                          On Hold
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateApplicationStatus(application.id, 'rejected')}
                          disabled={updateApplicationStatusMutation.isPending}
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateApplicationStatus(application.id, 'accepted')}
                          disabled={updateApplicationStatusMutation.isPending}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleScheduleInterview(application)}
                          disabled={scheduleInterviewMutation.isPending}
                        >
                          Schedule Interview
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/recruiter/students?applicantId=${application.studentId}`)}
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No applications yet for this drive.</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewApplicantsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Interview Dialog */}
        <Dialog open={isScheduleInterviewDialogOpen} onOpenChange={setIsScheduleInterviewDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Schedule an interview for {selectedApplication?.studentId}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="interview-date">Date</Label>
                <Input
                  id="interview-date"
                  type="date"
                  value={interviewForm.date}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="interview-time">Time</Label>
                <Input
                  id="interview-time"
                  type="time"
                  value={interviewForm.time}
                  onChange={(e) => setInterviewForm(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="interview-mode">Mode</Label>
                <Select
                  value={interviewForm.mode}
                  onValueChange={(value: 'online' | 'offline') => setInterviewForm(prev => ({ ...prev, mode: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {interviewForm.mode === 'online' && (
                <div>
                  <Label htmlFor="interview-link">Meeting Link (Optional)</Label>
                  <Input
                    id="interview-link"
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={interviewForm.link || ''}
                    onChange={(e) => setInterviewForm(prev => ({ ...prev, link: e.target.value }))}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleInterviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitInterview} disabled={scheduleInterviewMutation.isPending}>
                Schedule Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterDrives;
