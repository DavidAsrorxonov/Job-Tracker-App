import { JobApplicationCardProps } from "@/interface/job-application-card";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const JobApplicationCard = ({ job, columns }: JobApplicationCardProps) => {
  const { company, position, description, tags, notes, jobUrl } = job;

  return (
    <>
      <Card>
        <CardContent>
          <div>
            <div>
              <h3>{position}</h3>
              <p>{company}</p>
              {description && <p>{description}</p>}
              {tags && tags.length > 0 && (
                <div>
                  {tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              )}

              {jobUrl && (
                <a
                  href={jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink />
                </a>
              )}
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 />
                    Edit
                  </DropdownMenuItem>
                  {columns.length > 1 && (
                    <>
                      {columns
                        .filter((c) => c._id !== job.columnId)
                        .map((col, idx) => (
                          <DropdownMenuItem key={idx}>
                            Move to {col.name}
                          </DropdownMenuItem>
                        ))}
                    </>
                  )}
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
