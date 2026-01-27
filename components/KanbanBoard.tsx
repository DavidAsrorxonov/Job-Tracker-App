"use client";

import { KanbanBoardProps } from "@/interface/kanban-board";
import { Award, Calendar, CheckCircle2, Mic, XCircle } from "lucide-react";

const COLUMN_CONFIG: Array<{ color: string; icon: React.ReactNode }> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    color: "bg-green-500",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-500",
    icon: <Award className="h-4 w-4" />,
  },
  {
    color: "bg-red-500",
    icon: <XCircle className="h-4 w-4" />,
  },
];

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  return <div>KanbanBoard</div>;
};

export default KanbanBoard;
