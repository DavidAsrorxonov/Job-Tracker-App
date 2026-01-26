import KanbanBoard from "@/components/KanbanBoard";
import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";

const Dashboard = async () => {
  const session = await getSession();

  await connectDB();

  const board = await Board.findOne({
    userId: session?.user.id,
    name: "Job Hunt",
  });

  console.log(board);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">{board.name}</h1>
          <p className="text-muted-foreground">Track your job applications</p>
        </div>

        <KanbanBoard board={board} userId={session?.user.id!} />
      </div>
    </div>
  );
};

export default Dashboard;
