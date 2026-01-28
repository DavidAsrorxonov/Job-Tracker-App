import { ColumnProps, JobApplicationProps } from "@/lib/models/models.types";

export interface JobApplicationCardProps {
  job: JobApplicationProps;
  columns: ColumnProps[];
}
