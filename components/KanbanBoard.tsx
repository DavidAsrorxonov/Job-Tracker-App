"use client";

import { KanbanBoardProps } from "@/interface/kanban-board";
import { ColumnProps, JobApplicationProps } from "@/lib/models/models.types";
import {
  Award,
  Calendar,
  CheckCircle2,
  Mic,
  MoreVertical,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobDialog from "./CreateJobDialog";
import SortableJobCard from "./SortableJobCard";
import { useBoard } from "@/lib/hooks/useBoard";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import JobApplicationCard from "./JobApplicationCard";
import CreateColumnDialog from "./CreateColumnDialog";
import { deleteColumn } from "@/lib/actions/columns";
import { toast } from "sonner";

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
  sortedColumns,
  isDragging,
}: {
  column: ColumnProps;
  config: ColumnConfig;
  boardId: string;
  sortedColumns: ColumnProps[];
  isDragging: boolean;
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column._id,
    data: {
      type: "column",
      columnId: column._id,
    },
  });

  const handleDelete = async () => {
    try {
      const result = await deleteColumn(column._id);

      if (result.error) {
        toast.error("Failed to delete column", {
          description: result.error,
          duration: 2000,
          position: "top-center",
        });
        return;
      }

      toast.success("Successfully deleted column", {
        duration: 2000,
        position: "top-center",
        description: `Column with the ID: ${result.data?.id} has been deleted`,
      });
    } catch (error) {
      toast.error("Failed to delete column", {
        description: "Please try again",
        duration: 2000,
        position: "top-center",
      });
      console.error(error);
    }
  };

  const sortedJobs =
    column.jobApplications?.sort((a, b) => a.order - b.order) || [];

  return (
    <Card
      className={`min-w-75 shrink-0 shadow-md p-0 ${isDragging ? "bg-accent border border-primary border-dashed" : ""}`}
    >
      <CardHeader className={`${config.color} rounded-t-lg py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle className="text-base font-semibold">
              {column.name}
            </CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className={`w-6 h-6`}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Button onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Column
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent
        ref={setNodeRef}
        className={`space-y-2 py-4 min-h-100 transition-colors ${isOver ? "rign-2 ring-primary" : ""}`}
      >
        <SortableContext
          items={sortedJobs.map((job) => job._id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedJobs.map((job, idx) => (
            <SortableJobCard
              key={idx}
              job={{ ...job, columnId: job.columnId || column._id }}
              columns={sortedColumns}
            />
          ))}
        </SortableContext>

        <CreateJobDialog columnId={column._id} boardId={boardId} />
      </CardContent>
    </Card>
  );
};

const KanbanBoard = ({ board, userId }: KanbanBoardProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { columns, moveJob } = useBoard(board);

  const sortedColumns = columns.sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = async (event: DragStartEvent) => {
    setIsDragging(true);
    setActiveId(event.active.id as string);
  };
  const handleDragEnd = async (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    setActiveId(null);

    if (!over || !board._id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let draggedJob: JobApplicationProps | null = null;
    let sourceColumn: ColumnProps | null = null;
    let sourceIndex = -1;

    for (const column of sortedColumns) {
      const jobs =
        column.jobApplications.sort((a, b) => a.order - b.order) || [];
      const jobIndex = jobs.findIndex((job) => job._id === activeId);

      if (jobIndex !== -1) {
        draggedJob = jobs[jobIndex];
        sourceColumn = column;
        sourceIndex = jobIndex;
        break;
      }
    }

    if (!draggedJob || !sourceColumn) return;

    const targetColumn = sortedColumns.find((col) => col._id === overId);
    const targetJob = sortedColumns
      .flatMap((col) => col.jobApplications || [])
      .find((job) => job._id === overId);

    let targetColumnId: string;
    let newOrder: number;

    if (targetColumn) {
      targetColumnId = targetColumn._id;
      const jobsInTarget =
        targetColumn.jobApplications
          .filter((job) => job._id !== activeId)
          .sort((a, b) => a.order - b.order) || [];

      newOrder = jobsInTarget.length;
    } else if (targetJob) {
      const targetJobColumn = sortedColumns.find((col) =>
        col.jobApplications.some((job) => job._id === targetJob._id),
      );

      targetColumnId = targetJob.columnId || targetJobColumn?._id || "";
      if (!targetColumnId) return;

      const targetColumnObject = sortedColumns.find(
        (col) => col._id === targetColumnId,
      );

      if (!targetColumnObject) return;

      const allJobsInTargetOriginal =
        targetColumnObject.jobApplications.sort((a, b) => a.order - b.order) ||
        [];

      const allJobsInTargetFiltered =
        allJobsInTargetOriginal.filter((j) => j._id !== activeId) || [];

      const targetIndexInOriginal = allJobsInTargetOriginal.findIndex(
        (j) => j._id === overId,
      );

      const targetIndexInFiltered = allJobsInTargetFiltered.findIndex(
        (j) => j._id === overId,
      );

      if (targetIndexInFiltered !== -1) {
        if (sourceColumn._id === targetColumnId) {
          if (sourceIndex < targetIndexInOriginal) {
            newOrder = targetIndexInFiltered + 1;
          } else {
            newOrder = targetIndexInFiltered;
          }
        } else {
          newOrder = targetIndexInFiltered;
        }
      } else {
        newOrder = allJobsInTargetFiltered.length;
      }
    } else {
      return;
    }

    if (!targetColumnId) return;

    await moveJob(activeId, targetColumnId, newOrder);
  };

  const activeJob = sortedColumns
    .flatMap((col) => col.jobApplications || [])
    .find((job) => job._id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-y-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sortedColumns.map((col, idx) => {
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
                sortedColumns={sortedColumns}
                isDragging={isDragging}
              />
            );
          })}

          <CreateColumnDialog boardId={board._id} />
        </div>
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className="opacity-50">
            <JobApplicationCard job={activeJob} columns={sortedColumns} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
