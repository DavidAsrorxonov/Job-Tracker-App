"use client";

import { useEffect, useState } from "react";
import { BoardProps, ColumnProps } from "../models/models.types";

export const useBoard = (initialBoard?: BoardProps | null) => {
  const [board, setBoard] = useState<BoardProps | null>(initialBoard || null);
  const [columns, setColumns] = useState<ColumnProps[]>(
    initialBoard?.columns || [],
  );
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
  ) => {};

  return {
    board,
    columns,
    error,
    moveJob,
  };
};
