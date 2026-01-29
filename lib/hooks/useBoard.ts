"use client";

import { useState } from "react";
import { BoardProps, ColumnProps } from "../models/models.types";

export const useBoard = (initialBoard?: BoardProps | null) => {
  const [board, setBoard] = useState<BoardProps | null>(initialBoard || null);
  const [columns, setColumns] = useState<ColumnProps[]>(
    initialBoard?.columns || [],
  );
  const [error, setError] = useState<string | null>(null);

  const moveJob = async (
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) => {};

  return {
    board,
    columns,
    error,
    moveJob,
  };
};
