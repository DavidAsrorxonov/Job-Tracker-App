"use client";

import { JobApplicationCardProps } from "@/interface/job-application-card";
import { Card, CardContent } from "./ui/card";
import {
  Edit2,
  ExternalLink,
  Loader2,
  MoreVertical,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import {
  deleteJobApplication,
  updateJobApplication,
} from "@/lib/actions/job-applications";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";

const JobApplicationCard = ({
  job,
  columns,
  dragHandleProps,
}: JobApplicationCardProps) => {
  const router = useRouter();

  const { company, position, description, tags, jobUrl, _id } = job;

  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    company: job.company || "",
    position: job.position || "",
    location: job.location || "",
    notes: job.notes || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    tags: job.tags?.join(", ") || "",
    description: job.description || "",
  });

  const handleMove = async (newColumnId: string) => {
    try {
      const result = await updateJobApplication(job._id, {
        columnId: newColumnId,
      });

      if (result.error) {
        toast.error("Failed to move job application", {
          description: result.error,
          duration: 2000,
          position: "top-center",
        });
        return;
      }

      toast.success("Successfully moved job application", {
        duration: 1000,
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to move job application", {
        description: "Please try again",
        duration: 2000,
        position: "top-center",
      });
      console.error(error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await updateJobApplication(job._id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (result.error) {
        toast.error("Failed to update job application", {
          description: result.error,
          duration: 2000,
          position: "top-center",
        });
        return;
      }

      toast.success("Successfully updated job application", {
        duration: 2000,
        position: "top-center",
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update job application", {
        description: "Please try again",
        duration: 2000,
        position: "top-center",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteJobApplication(job._id);

      if (result.error) {
        toast.error("Failed to delete job application", {
          description: result.error,
          duration: 2000,
          position: "top-center",
        });
        return;
      }

      toast.success("Successfully deleted job application", {
        duration: 2000,
        position: "top-center",
        description: `Job with the ID: ${result.data?.id} has been deleted`,
      });
    } catch (error) {
      toast.error("Failed to delete job application", {
        description: "Please try again",
        duration: 2000,
        position: "top-center",
      });
      console.error(error);
    }
  };

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-lg group shadow-sm px-6"
        {...dragHandleProps}
        onClick={() => router.push(`/dashboard/${_id}`)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">{position}</h3>
              <p className="text-xs text-muted-foreground mb-2">{company}</p>
              {description && (
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {description}
                </p>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {tags.map((tag, idx) => (
                    <Badge key={idx}>{tag}</Badge>
                  ))}
                </div>
              )}

              {jobUrl && (
                <a
                  href={jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                >
                  Visit the job website
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>

            <div className="flex items-start gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"} className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((col, idx) => (
                          <DropdownMenuItem
                            key={idx}
                            onClick={() => handleMove(col._id)}
                          >
                            Move to {col.name}
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}

                  <DropdownMenuItem onClick={handleDelete}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job Application</DialogTitle>
            <DialogDescription>
              Update job application details
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g., Google, Facebook"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    required
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    placeholder="e.g., Software Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., New York, NY or Remote"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    placeholder="e.g., $100k - $150k"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobUrl">Job URL</Label>
                <Input
                  id="jobUrl"
                  value={formData.jobUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, jobUrl: e.target.value })
                  }
                  placeholder="https://www.google.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="High Level, Software Engineer, Remote"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the job ..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Notes about the job ..."
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving changes...
                  </>
                ) : (
                  <>Save Changes</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobApplicationCard;
