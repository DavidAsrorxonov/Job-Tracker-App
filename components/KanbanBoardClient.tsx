"use client";

import dynamic from "next/dynamic";
import PageLoading from "@/components/page-loading";

const KanbanBoard = dynamic(() => import("@/components/KanbanBoard"), {
  ssr: false,
  loading: () => <PageLoading text="Loading your Board..." />,
});

export default function KanbanBoardClient(
  props: React.ComponentProps<typeof KanbanBoard>,
) {
  return <KanbanBoard {...props} />;
}
