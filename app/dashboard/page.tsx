import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { Suspense } from "react";

const getBoard = async (userId: string) => {
  "use cache";

  await connectDB();
  const boardDoc = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if (!boardDoc) return null;

  const board = JSON.parse(JSON.stringify(boardDoc));

  return board;
};

const DashboardPage = async () => {
  const session = await getSession();
  const board = await getBoard(session?.user.id ?? "");

  if (!board) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-6">
          <p className="text-muted-foreground">No board found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <p className="text-muted-foreground">Track your job applications</p>
        </div>

        <KanbanBoard board={board} userId={session?.user.id!} />
      </div>
    </div>
  );
};

const Dashboard = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
};

export default Dashboard;
