"use client";

import { useEffect, useState } from "react";
import {
  BoardProps,
  ColumnProps,
  JobApplicationProps,
} from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";
import { toast } from "sonner";

export const useBoard = (initialBoard?: BoardProps | null) => {
  const [board, setBoard] = useState<BoardProps | null>(initialBoard || null);
  const [columns, setColumns] = useState<ColumnProps[]>(
    initialBoard?.columns || [],
  );

  //@typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setColumns(initialBoard.columns || []);
    }
  }, [initialBoard]);

  const moveJob = async (
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) => {
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      let jobToMove: JobApplicationProps | null = null;
      let oldColumnId: string | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (j) => j._id === jobApplicationId,
        );

        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnId = col._id;
          col.jobApplications = col.jobApplications.filter(
            (j) => j._id !== jobApplicationId,
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId,
        );

        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          const jobsWithUpdatedOrders = updatedJobs.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      const result = await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });

      if (result.error) {
        toast.error("Failed to move job application", {
          description: result.error,
          duration: 2000,
          position: "top-center",
        });
        return;
      }

      toast.success("Successfully moved job application", {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    board,
    columns,
    error,
    moveJob,
  };
};
