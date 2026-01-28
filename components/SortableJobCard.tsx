import { ColumnProps, JobApplicationProps } from "@/lib/models/models.types";
import JobApplicationCard from "./JobApplicationCard";

const SortableJobCard = ({
  job,
  columns,
}: {
  job: JobApplicationProps;
  columns: ColumnProps[];
}) => {
  return (
    <div>
      <JobApplicationCard job={job} columns={columns} />
    </div>
  );
};

export default SortableJobCard;
