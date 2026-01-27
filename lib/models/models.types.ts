export interface JobApplicationProps {
  _id: string;
  company: string;
  position: string;
  location?: string;
  status: string;
  notes?: string;
  salary?: string;
  jobUrl?: string;
  order: number;
  columnId?: string;
  tags?: string[];
  description?: string;
}

export interface ColumnProps {
  _id: string;
  name: string;
  order: number;
  jobApplications: JobApplicationProps[];
}

export interface BoardProps {
  _id: string;
  name: string;
  columns: ColumnProps[];
}
