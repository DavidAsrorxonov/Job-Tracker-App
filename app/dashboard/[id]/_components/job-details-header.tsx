import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/helper/formatDate";
import { normalizeUrl } from "@/lib/helper/normalizeUrl";
import { ExternalLink, MoreVertical } from "lucide-react";
import React from "react";

type Job = {
  _id: string;
  company: string;
  position: string;
  location?: string;
  jobUrl?: string;
  createdAt?: string | Date;
  salary?: string;
  tags?: string[];
  status: string;
  updatedAt?: string | Date;
};

const JobDetailsHeader = ({ job }: { job: Job }) => {
  const applied = formatDate(job.createdAt);
  const updated = formatDate(job.updatedAt);

  const hasUrl = Boolean(job.jobUrl?.trim());
  const safeUrl = hasUrl ? normalizeUrl(job.jobUrl!.trim()) : "";

  const tags = job.tags ?? [];
  const visibleTags = tags.slice(0, 2);
  const hiddenCount = Math.max(tags.length - visibleTags.length);

  return (
    <header className="w-full border-b border-border/40 bg-background/60 backdrop-blur-lg">
      <div className="px-6 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight truncate">
              {job.position}
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/90">
                {job.company}
              </span>
              {job.location ? (
                <>
                  <span className="opacity-50">·</span>
                  <span>{job.location}</span>
                </>
              ) : null}

              {job.status ? (
                <>
                  <span className="opacity-50">·</span>
                  <span>
                    Currently in: <Badge>{job.status}</Badge> column
                  </span>
                </>
              ) : null}
            </div>

            {tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {visibleTags.map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">
                    {t}
                  </Badge>
                ))}
                {hiddenCount > 0 ? (
                  <Badge variant="outline" className="font-normal">
                    +{hiddenCount}
                  </Badge>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 sm:pt-1">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasUrl}
              asChild={hasUrl}
              title={hasUrl ? "Open job posting" : "Add jobUrl to enable"}
            >
              {hasUrl ? (
                <a href={safeUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open posting
                </a>
              ) : (
                <span>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open posting
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Separator className="mb-3" />
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="outline" className="font-normal">
              Applied: {applied ?? "Not set"}
            </Badge>

            <Badge variant="outline" className="font-normal">
              Salary: {job.salary?.trim() ? job.salary : "Not set"}
            </Badge>

            {updated ? (
              <span className="text-muted-foreground">Updated {updated}</span>
            ) : null}

            <div className="ml-auto flex flex-wrap gap-2">
              {!hasUrl ? (
                <Badge variant="secondary" className="font-normal">
                  Missing job URL
                </Badge>
              ) : null}
              {!job.createdAt ? (
                <Badge variant="secondary" className="font-normal">
                  Missing applied date
                </Badge>
              ) : null}
              {!job.tags || job.tags.length === 0 ? (
                <Badge variant="secondary" className="font-normal">
                  No tags yet
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default JobDetailsHeader;
