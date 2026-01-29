import { JobApplicationCardProps } from "@/interface/job-application-card";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { updateJobApplication } from "@/lib/actions/job-applications";

const JobApplicationCard = ({ job, columns }: JobApplicationCardProps) => {
  const { company, position, description, tags, notes, jobUrl } = job;

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

  return (
    <>
      <Card className="cursor-pointer transition-shadow hover:shadow-lg group shadow-sm">
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
                  <DropdownMenuItem>
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

                  <DropdownMenuItem>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default JobApplicationCard;
