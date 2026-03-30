import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/helper/formatDate";
import { normalizeUrl } from "@/lib/helper/normalizeUrl";
import { Activity, ExternalLink } from "lucide-react";
import "../_styles/panel.css";
import { WarningAboutEditing } from "./warning-about-editing";
import Link from "next/link";

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
    <header className="w-full border-b border-r border-dashed border-border bg-background/60 backdrop-blur-lg">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="wrap-break-word text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
              {job.position}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/90 wrap-break-word">
                {job.company}
              </span>

              {job.location ? (
                <>
                  <span className="hidden opacity-50 sm:inline">·</span>
                  <span className="wrap-break-word">{job.location}</span>
                </>
              ) : null}

              {job.status ? (
                <>
                  <span className="hidden opacity-50 sm:inline">·</span>
                  <span className="flex flex-wrap items-center gap-1">
                    <span>Currently in:</span>
                    <Badge className="max-w-full">{job.status}</Badge>
                    <span>column</span>
                  </span>
                </>
              ) : null}
            </div>

            <div className="mt-3">
              <WarningAboutEditing />
            </div>

            {tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {visibleTags.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="max-w-full font-normal break-all"
                  >
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

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:flex-col xl:flex-row">
            <Link
              href={`/dashboard/${job._id}/timeline`}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Activity className="mr-2 h-4 w-4 shrink-0" />
                Timeline
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              disabled={!hasUrl}
              asChild={hasUrl}
              title={hasUrl ? "Open job posting" : "Add jobUrl to enable"}
              className="w-full sm:w-auto"
            >
              {hasUrl ? (
                <a href={safeUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
                  Open posting
                </a>
              ) : (
                <span>
                  <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
                  Open posting
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Separator className="mb-3" />
          <div className="flex flex-col gap-3 text-sm lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-normal">
                Applied: {applied ?? "Not set"}
              </Badge>

              <Badge variant="outline" className="font-normal">
                Salary: {job.salary?.trim() ? job.salary : "Not set"}
              </Badge>

              {updated ? (
                <span className="text-muted-foreground wrap-break-word">
                  Updated {updated}
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
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
