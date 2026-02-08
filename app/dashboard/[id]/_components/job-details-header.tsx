import React from "react";

type Job = {
  _id: string;
  company: string;
  position: string;
  location?: string;
  jobUrl?: string;
  appliedDate?: string | Date;
  salary?: string;
  tags?: string[];
  updatedAt?: string | Date;
};

const JobDetailsHeader = ({
  job,
  columnName,
}: {
  job: Job;
  columnName?: string;
}) => {
  // const applied =

  return <div>JobDetailsHeader</div>;
};

export default JobDetailsHeader;
