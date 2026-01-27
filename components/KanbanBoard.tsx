"use client";

import { KanbanBoardProps } from "@/interface/kanban-board";
import { ColumnProps } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, XCircle } from "lucide-react";
import { Card } from "./ui/card";

interface ColumnConfig {
  color: string;
  icon: React.ReactNode;
}
const COLUMN_CONFIG: Array<ColumnConfig> = [
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

const DroppableColumn = ({
  column,
  config,
  boardId,
}: {
  column: ColumnProps;
  config: ColumnConfig;
  boardId: string;
}) => {
  return <Card></Card>;
};

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  const columns = board.columns;

  return (
    <>
      <div>
        <div>
          {columns.map((col, idx) => {
            const config = COLUMN_CONFIG[idx] || {
              color: "bg-gray-500",
              icon: <Calendar className="h-4 w-4" />,
            };
            return (
              <DroppableColumn
                key={idx}
                column={col}
                config={config}
                boardId={board._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
